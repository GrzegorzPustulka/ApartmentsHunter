from subscriptions.api.v1.dependencies import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status
from subscriptions.schemas.users import UserCreate
from subscriptions.repository.users import user as user_repository

from typing import Annotated

router = APIRouter(prefix="/users", tags=["users"])

Session = Annotated[Session, Depends(get_db)]


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_offer(user_in: UserCreate, db: Session):
    user = user_repository.get_by_email(db, email=user_in.email)

    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user with this email already exists in the system.",
        )

    user_repository.create(db, user_in)
