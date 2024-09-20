from uuid import UUID

from pydantic import BaseModel, EmailStr
from typing import Literal
from catalogue.schemas.apartment import ApartmentParams, ApartmentRead
from subscriptions.models import SubscriptionStatus


class SubscriptionCreate(ApartmentParams):
    notification_destination: Literal["email"] = "email"
    user_email: EmailStr


class SubscriptionRead(SubscriptionCreate):
    id: UUID
    user_id: UUID
    status: SubscriptionStatus


class SubscriptionUpdate(BaseModel):
    pass


class UpdateStatusRequest(BaseModel):
    status: SubscriptionStatus
