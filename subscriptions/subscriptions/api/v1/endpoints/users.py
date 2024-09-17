from fastapi.security import OAuth2PasswordRequestForm

from subscriptions.api.v1.dependencies import DB
from fastapi import APIRouter, Depends, HTTPException, status
from subscriptions.schemas.users import UserCreate, Token
from subscriptions.repository.users import user as user_repository
from subscriptions.core.config import settings
from subscriptions.core.security import create_access_token
from typing import Annotated
from datetime import timedelta

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user(user_in: UserCreate, db: DB):
    user = user_repository.get_by_email(db, email=user_in.email)

    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user with this email already exists in the system.",
        )

    user_repository.create(db, user_in)


@router.post("/access-token")
def login_access_token(
    db: DB, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    user = user_repository.authenticate(
        db, email=form_data.username, password=form_data.password
    )

    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    return Token(
        access_token=create_access_token(user.id, expires_delta=access_token_expires)
    )
