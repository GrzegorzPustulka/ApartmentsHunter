from uuid import UUID

from fastapi import APIRouter, status, HTTPException
from subscriptions.schemas.subscriptions import (
    SubscriptionCreate,
    SubscriptionRead,
    SubscriptionUpdate,
)
from subscriptions.api.v1.dependencies import DB, CurrentUser
from subscriptions.repository.subscriptions import subscription as sub_repository


router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_offer(
    current_user: CurrentUser, subscription: SubscriptionCreate, db: DB
):
    sub_repository.create(db, subscription)


@router.get(
    "/{subscription_id}",
    response_model=SubscriptionRead,
    status_code=status.HTTP_200_OK,
)
async def read_subscription(subscription_id: UUID, db: DB) -> SubscriptionRead:
    sub = sub_repository.get_by_id(db, subscription_id)

    if not sub:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Subscription with id '{subscription_id}' not found.",
        )
    return SubscriptionRead.model_validate(sub.as_dict())
