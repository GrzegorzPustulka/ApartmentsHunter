from uuid import UUID

from pydantic import BaseModel, EmailStr
from typing import Literal
from catalogue.schemas.apartment import ApartmentParamsBase, ApartmentRead
from subscriptions.models import SubscriptionStatus


class SubscriptionCreate(ApartmentParamsBase):
    notification_destination: Literal["email", "discord", "telegram"] = "email"
    notification_endpoint: str


class SubscriptionRead(SubscriptionCreate):
    id: UUID
    user_id: UUID
    status: SubscriptionStatus


class SubscriptionUpdate(SubscriptionCreate):
    pass


class UpdateStatusRequest(BaseModel):
    status: SubscriptionStatus
