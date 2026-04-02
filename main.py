import os
from typing import Annotated, Optional
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import FileResponse
from models import Users, Todos
from contextlib import asynccontextmanager
from database import SessionLocal, engine, Base, init_db, get_db
from routers import admin, auth, todos, users
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.openapi.docs import get_swagger_ui_html, get_redoc_html

base_dir = os.path.dirname(os.path.abspath(__file__))
favicon_path = os.path.join(base_dir, "favicon.ico")

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    title="TAPI",
    description="Todos API built with FastAPI and PostgreSQL",
    version="2.2.2",
    lifespan=lifespan,
    root_path="/api",
    docs_url=None,
    redoc_url=None,
    )

app.include_router(auth.router)
app.include_router(todos.router)
app.include_router(admin.router)
app.include_router(users.router)



# -----Configs-----
origins = [
    "localhost", 
    "anthonysjhenry.com", 
    "www.anthonysjhenry.com", 
    "server", 
    "client",
]
allowed_hosts = ["localhost", "*.anthonysjhenry.com", "anthonysjhenry.com", "client", "server"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=allowed_hosts,
)
# -----End of Configs-----

# -----Additional Routes(not included in OpenAPI schema)-----
@app.get("/healthy", include_in_schema=False)
async def healthy():
    return {
        "status": "healthy",
        "message": "TAPI is healthy and running"
            }

@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        title=app.title,
        openapi_url="/api/openapi.json",
        swagger_favicon_url="./favicon.ico"
    )

@app.get("/redoc", include_in_schema=False)
async def redoc_html():
    return get_redoc_html(
        openapi_url="/api/openapi.json",
        title=app.title,
        redoc_favicon_url="/favicon.ico"
    )

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(favicon_path)

# -----End of Additional Routes-----

