from fastapi import FastAPI
from subscriptions.api.v1.endpoints.subscriptions import router as subscriptions_router
from subscriptions.api.v1.endpoints.users import router as users_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(subscriptions_router)
app.include_router(users_router)
