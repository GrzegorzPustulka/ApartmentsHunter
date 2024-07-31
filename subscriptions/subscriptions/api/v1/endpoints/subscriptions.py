from uuid import UUID

from fastapi import APIRouter, status, Depends, HTTPException
from subscriptions.schemas.subscriptions import (
    SubscriptionCreate,
    SubscriptionRead,
    SubscriptionUpdate,
)
from subscriptions.dependencies import get_db
from typing import Annotated
from sqlalchemy.orm import Session
from subscriptions.repository.subscription import subscription as sub_repository


router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])

Session = Annotated[Session, Depends(get_db)]


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_offer(subscription: SubscriptionCreate, db: Session):
    breakpoint()
    sub_repository.create(db, subscription)


@router.get(
    "/{subscription_id}",
    response_model=SubscriptionRead,
    status_code=status.HTTP_200_OK,
)
async def read_subscription(subscription_id: UUID, db: Session) -> SubscriptionRead:
    sub = sub_repository.get_by_id(db, subscription_id)

    if not sub:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Subscription with id '{subscription_id}' not found.",
        )
    return SubscriptionRead.model_validate(sub.as_dict())


@router.get("/", response_model=list[SubscriptionRead])
async def read_subscriptions(db: Session):
    pass


@router.put("/{subscription_id}", response_model=SubscriptionRead)
async def update_subscription(subscription_id: UUID, subscription: SubscriptionUpdate):
    pass


@router.delete("/{subscription_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_subscription(subscription_id: UUID, db: Session):
    pass
