from fastapi import FastAPI
from catalogue.api.v1.endpoints.apartment import router as apartment_router
from fastapi.middleware.cors import CORSMiddleware
from catalogue.config import settings

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(apartment_router)
