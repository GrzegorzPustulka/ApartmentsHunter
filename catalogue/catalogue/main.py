from fastapi import FastAPI
from catalogue.api.v1.endpoints.apartment import router as apartment_router

app = FastAPI()

app.include_router(apartment_router)
