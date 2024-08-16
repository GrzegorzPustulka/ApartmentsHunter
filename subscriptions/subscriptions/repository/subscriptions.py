from subscriptions.models import Subscription
from subscriptions.schemas.subscriptions import SubscriptionCreate, SubscriptionUpdate

from subscriptions.repository.base import BaseRepository


class SubscriptionRepository(
    BaseRepository[Subscription, SubscriptionCreate, SubscriptionUpdate]
):
    pass


subscription = SubscriptionRepository(Subscription)
