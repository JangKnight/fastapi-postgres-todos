from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()

USERS = [
    {"username": "user1", "password": "pass1"},
    {"username": "user2", "password": "pass2"},
    {"username": "user3", "password": "pass3"}
]


@router.get("/users")
async def read_users():
    return USERS