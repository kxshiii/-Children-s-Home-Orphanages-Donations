from pydantic import BaseModel
from typing import Optional

class ChildrensHomeBase(BaseModel):
    name: str
    location: str
    description: Optional[str] = None

class ChildrensHomeCreate(ChildrensHomeBase):
    pass

class ChildrensHomeOut(ChildrensHomeBase):
    id: int