from uuid import UUID

from fastapi import APIRouter, status, HTTPException
from subscriptions.schemas.subscriptions import (
    SubscriptionCreate,
    SubscriptionRead,
    SubscriptionUpdate,
    UpdateStatusRequest,
)
from subscriptions.api.v1.dependencies import DB, CurrentUser
from subscriptions.repository.subscriptions import subscription as sub_repository


router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_offer(
    current_user: CurrentUser, subscription: SubscriptionCreate, db: DB
):
    active_subscriptions = sub_repository.get_by_user_id(db, current_user.id)
    if len(active_subscriptions) >= current_user.subscription_limit:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Subscription limit exceeded.",
        )

    sub_repository.create_subscription(db, subscription, current_user.id)


@router.get(
    "/{subscription_id}",
    response_model=SubscriptionRead,
    status_code=status.HTTP_200_OK,
)
async def read_subscription(
    current_user: CurrentUser, subscription_id: UUID, db: DB
) -> SubscriptionRead:
    sub = sub_repository.get_by_id(db, subscription_id)

    if not sub:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Subscription with id '{subscription_id}' not found.",
        )
    if sub.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Not enough permissions."
        )

    return SubscriptionRead.model_validate(sub.as_dict())


@router.get(
    "/",
    response_model=list[SubscriptionRead],
    status_code=status.HTTP_200_OK,
)
async def read_all_subscriptions(
    current_user: CurrentUser, db: DB
) -> list[SubscriptionRead]:
    subs = sub_repository.get_by_user_id(db, current_user.id)

    if not subs:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="You do not have subscriptions.",
        )
    return [SubscriptionRead.model_validate(sub.as_dict()) for sub in subs]


@router.delete("/{subscription_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_subscription(current_user: CurrentUser, subscription_id: UUID, db: DB):
    sub = sub_repository.get_by_id(db, subscription_id)

    if not sub:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Subscription with id '{subscription_id}' does not exist.",
        )

    if sub.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You do not have permission to delete this subscription.",
        )

    sub_repository.delete_by_id(db, subscription_id)


@router.patch("/{subscription_id}/status", status_code=status.HTTP_204_NO_CONTENT)
async def update_subscription_status(
    current_user: CurrentUser,
    subscription_id: UUID,
    db: DB,
    status_update: UpdateStatusRequest,
):
    sub = sub_repository.get_by_id(db, subscription_id)

    if not sub:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Subscription with id '{subscription_id}' does not exist.",
        )

    if sub.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You do not have permission to delete this subscription.",
        )

    sub_repository.update_status(db, subscription_id, status_update.status.value)
