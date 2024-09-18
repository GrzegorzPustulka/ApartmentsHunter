from subscriptions.models import Subscription
from subscriptions.schemas.subscriptions import SubscriptionCreate, SubscriptionUpdate
from sqlalchemy.orm import Session
from sqlalchemy import select, insert
from subscriptions.repository.base import BaseRepository


class SubscriptionRepository(
    BaseRepository[Subscription, SubscriptionCreate, SubscriptionUpdate]
):
    @staticmethod
    def get_by_user_id(db: Session, user_id: str) -> list[Subscription] | None:
        return db.scalars(
            select(Subscription).where(Subscription.user_id == user_id)
        ).all()

    @staticmethod
    def create_subscription(
        db: Session, subscription_in: SubscriptionCreate, user_id: str
    ) -> None:
        values = {**subscription_in.model_dump(), "user_id": user_id}
        db.execute(insert(Subscription).values(values))
        db.commit()


subscription = SubscriptionRepository(Subscription)