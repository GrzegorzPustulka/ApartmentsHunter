from fastapi import FastAPI
from subscriptions.api.v1.endpoints.subscriptions import router as subscriptions_router


app = FastAPI()

app.include_router(subscriptions_router)
