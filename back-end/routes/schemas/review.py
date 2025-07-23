from pydantic import BaseModel
from typing import Optional

class ReviewCreate(BaseModel):
    user_id: int
    home_id: int
    rating: int
    comment: Optional[str] = None

class ReviewOut(BaseModel):
    id: int
    user_id: int
    home_id: int
    rating: int
    comment: Optional[str]
    created_at: str