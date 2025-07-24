from pydantic import BaseModel
from typing import Literal

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    is_admin: bool

class UserBase(BaseModel):
    email: str
    full_name: str

class UserCreate(UserBase):
    password: str
    role: Literal["admin", "user"] = "user"  # default to "user"

class UserOut(UserBase):
    id: int
    role: str
