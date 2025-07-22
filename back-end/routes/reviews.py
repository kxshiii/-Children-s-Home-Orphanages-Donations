from fastapi import APIRouter, HTTPException
from schemas.review import ReviewCreate, ReviewOut

router = APIRouter()

reviews_db = []

@router.post("/reviews", response_model=ReviewOut)
def create_review(review: ReviewCreate):
    new_review = ReviewOut(id=len(reviews_db)+1, **review.dict(), created_at="2025-07-21")
    reviews_db.append(new_review)
    return new_review

@router.get("/reviews", response_model=list[ReviewOut])
def list_reviews():
    return reviews_db