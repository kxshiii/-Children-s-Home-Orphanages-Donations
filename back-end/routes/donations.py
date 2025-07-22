from fastapi import APIRouter, HTTPException
from schemas.donation import DonationCreate, DonationOut

router = APIRouter()

donations_db = []

@router.post("/donate", response_model=DonationOut)
def donate(donation: DonationCreate):
    # Simulate donation creation
    new_donation = DonationOut(id=len(donations_db)+1, **donation.dict(), created_at="2025-07-21")
    donations_db.append(new_donation)
    return new_donation

@router.get("/donations", response_model=list[DonationOut])
def list_donations():
    return donations_db