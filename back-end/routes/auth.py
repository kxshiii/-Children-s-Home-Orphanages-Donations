from fastapi import APIRouter, HTTPException
from schemas.user import UserCreate, UserLogin, UserOut

router = APIRouter()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate):
    # Registration logic here
    return UserOut(id=1, username=user.username, email=user.email, is_admin=False)

@router.post("/login", response_model=UserOut)
def login(user: UserLogin):
    # Login logic here
    return UserOut(id=1, username=user.username, email="test@example.com", is_admin=False)