from fastapi import FastAPI
from subscriptions.api.v1.endpoints.subscriptions import router as subscriptions_router
from subscriptions.api.v1.endpoints.users import router as users_router


app = FastAPI()

app.include_router(subscriptions_router)
app.include_router(users_router)
