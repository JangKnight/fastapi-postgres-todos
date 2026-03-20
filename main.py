import os
from typing import Annotated, Optional
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import FileResponse
import models
from contextlib import asynccontextmanager
from database import SessionLocal, engine, Base, init_db, get_db
from routers import auth, todos
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html

base_dir = os.path.dirname(os.path.abspath(__file__))
favicon_path = os.path.join(base_dir, "favicon.ico")

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    title="TAPI",
    description="Todos API built with FastAPI and PostgreSQL",
    version="1.0.0",
    lifespan=lifespan,
    docs_url=None
    )


app.include_router(auth.router)
app.include_router(todos.router)

# -----Configs-----
origins = [
    "https://192.168.1.229:4000",
    "https://192.168.1.229:4444",
    "https://localhost:4444",
    "https://localhost:4000"
]    

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        title=app.title,
        openapi_url=app.openapi_url,
        swagger_favicon_url="./favicon.ico"
    )

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(favicon_path)

