from fastapi import APIRouter, HTTPException
from schemas.visit import VisitCreate, VisitOut

router = APIRouter()

visits_db = []

@router.post("/visits", response_model=VisitOut)
def create_visit(visit: VisitCreate):
    new_visit = VisitOut(id=len(visits_db)+1, **visit.dict(), created_at="2025-07-21")
    visits_db.append(new_visit)
    return new_visit

@router.get("/visits", response_model=list[VisitOut])
def list_visits():
    return visits_db