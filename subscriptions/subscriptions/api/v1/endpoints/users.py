from fastapi.security import OAuth2PasswordRequestForm

from subscriptions.api.v1.dependencies import DB
from fastapi import APIRouter, Depends, HTTPException, status
from subscriptions.schemas.users import (
    UserCreate,
    Token,
    PasswordResetRequest,
    PasswordReset,
)
from subscriptions.repository.users import user as user_repository
from subscriptions.core.config import settings
from subscriptions.core.security import (
    create_access_token,
    create_password_reset_token,
    verify_password_reset_token,
)
from subscriptions.tasks import send_password_reset_email
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


@router.post("/request-password-reset", status_code=status.HTTP_200_OK)
async def request_password_reset(request: PasswordResetRequest, db: DB):
    user = user_repository.get_by_email(db, email=request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    token = create_password_reset_token(user.email)

    send_password_reset_email(user.email, token)

    return {"message": "Password reset email sent"}


@router.post("/reset-password/{token}", status_code=status.HTTP_200_OK)
async def reset_password(token: str, reset_request: PasswordReset, db: DB):
    email = verify_password_reset_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    user = user_repository.get_by_email(db, email=email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user_repository.update_password(db, user.id, reset_request.new_password)

    return {"message": "Password has been reset successfully"}
