from fastapi import APIRouter, HTTPException
from schemas.childrens_home import ChildrensHomeCreate, ChildrensHomeOut
from typing import Optional

router = APIRouter()

homes_db = []

@router.post("/", response_model=ChildrensHomeOut)
def create_home(home: ChildrensHomeCreate):
    new_home = ChildrensHomeOut(id=len(homes_db)+1, **home.dict())
    homes_db.append(new_home)
    return new_home

@router.get("/", response_model=list[ChildrensHomeOut])
def list_homes():
    return homes_db

@router.get("/search", response_model=list[ChildrensHomeOut])
def search_homes(name: Optional[str] = None, location: Optional[str] = None):
    results = [
        h for h in homes_db
        if (not name or name.lower() in h.name.lower()) and
           (not location or location.lower() in h.location.lower())
    ]
    return results

@router.get("/{home_id}", response_model=ChildrensHomeOut)
def get_home(home_id: int):
    for home in homes_db:
        if home.id == home_id:
            return home
    raise HTTPException(status_code=404, detail="Home not found")
