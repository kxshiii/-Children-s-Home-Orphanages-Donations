from fastapi import APIRouter, HTTPException
from schemas.user import UserCreate, UserLogin
from schemas.token import TokenResponse, UserResponse

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate):
    # Registration logic here (mock example)
    return UserResponse(id=1, username=user.username, email=user.email, role="user")

@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin):
    # Mock login logic - replace with real auth check
    if user.username == "admin" and user.password == "adminpass":
        role = "admin"
    else:
        role = "user"

    # Mock token generation
    access_token = "abc.def.ghi"

    return TokenResponse(
        access_token=access_token,
        user=UserResponse(
            id=1,
            username=user.username,
            email=f"{user.username}@example.com",
            role=role
        )
    )
