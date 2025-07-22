from fastapi import FastAPI
from routes.auth import router as auth_router
from routes.donations import router as donations_router
from routes.homes import router as homes_router
from routes.reviews import router as reviews_router
from routes.visits import router as visits_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth")
app.include_router(donations_router, prefix="/donations")
app.include_router(homes_router, prefix="/homes")
app.include_router(reviews_router, prefix="/reviews")
app.include_router(visits_router, prefix="/visits")

@app.get("/")
def root():
    return {"message": "Children's Home & Orphanages Donations API"}