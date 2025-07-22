from pydantic import BaseModel
from typing import Optional

class VisitCreate(BaseModel):
    user_id: int
    home_id: int
    visit_date: str
    message: Optional[str] = None

class VisitOut(BaseModel):
    id: int
    user_id: int
    home_id: int
    visit_date: str
    message: Optional[str]
    created_at: str