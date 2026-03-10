from typing import Annotated, Optional
from fastapi import FastAPI, Depends, HTTPException
import models
from contextlib import asynccontextmanager
from database import SessionLocal, engine, Base, init_db
from routers import auth, todos, admin, users
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel, Field


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(lifespan=lifespan)


async def get_db():
    async with SessionLocal() as session:
        yield session

db_dependency = Annotated[AsyncSession, Depends(get_db)]

class TodosRequest(BaseModel):
    title: str
    description: Optional[str] = Field(min_length=1, max_length=256, default=None)
    priority: Optional[int] = Field(gt=0, lt=6, default=1)
    completed: Optional[bool] = Field(default=False)

@app.get("/")
async def read_all(db: db_dependency):
    result = await db.execute(select(models.Todos))
    return result.scalars().all()

@app.get("/todos/{todo_id}")
async def read_todo(todo_id: int, db: db_dependency):
    result = await db.execute(select(models.Todos).where(models.Todos.id == todo_id))
    todo = result.scalars().first()
    if not todo:
        raise HTTPException(status_code=404, detail=f"Todo with id {todo_id} not found")
    return todo

@app.post("/todos/")
async def create_todo(todo: TodosRequest, db: db_dependency):
    new_todo = models.Todos(**todo.model_dump())
    db.add(new_todo)
    await db.commit()
    result = await db.execute(select(models.Todos))
    return result.scalars().all()

@app.delete("/todos/{todo_id}")
async def read_todo(todo_id: int, db: db_dependency):
    result = await db.execute(select(models.Todos).where(models.Todos.id == todo_id))
    todo = result.scalars().first()
    if not todo:
        raise HTTPException(status_code=404, detail=f"Todo with id {todo_id} not found")
    await db.delete(todo)
    await db.commit()
    result = await db.execute(select(models.Todos))
    return result.scalars().all()

@app.put("/todos/{todo_id}")
# user must send entire object even if fields are not changed as the entire object will be replaced with what is sent
async def update_todo(todo_id: int, todo: TodosRequest, db: db_dependency):
    result = await db.execute(select(models.Todos).where(models.Todos.id == todo_id))
    todo_to_update = result.scalars().first()
    if not todo_to_update:
        raise HTTPException(status_code=404, detail=f"Todo with id {todo_id} not found")
    if todo.title:
        todo_to_update.title = todo.title
    if todo.description:
        todo_to_update.description = todo.description
    if todo.priority:
        todo_to_update.priority = todo.priority
    if todo.completed is not None:
        todo_to_update.completed = todo.completed
    await db.commit()
    result = await db.execute(select(models.Todos))
    return result.scalars().all()