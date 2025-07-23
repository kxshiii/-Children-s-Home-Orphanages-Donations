from pydantic import BaseModel
from typing import Optional

class DonationCreate(BaseModel):
    user_id: int
    home_id: int
    amount: float
    message: Optional[str] = None

class DonationOut(BaseModel):
    id: int
    user_id: int
    home_id: int
    amount: float
    message: Optional[str]
    created_at: str