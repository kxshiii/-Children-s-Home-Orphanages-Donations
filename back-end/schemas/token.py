from pydantic import BaseModel

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str  # or `is_admin: bool` if you prefer

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
