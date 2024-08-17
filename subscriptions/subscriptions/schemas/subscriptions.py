from uuid import UUID

from pydantic import BaseModel, EmailStr
from typing import Literal
from catalogue.schemas.apartment import ApartmentParams, ApartmentRead


class SubscriptionCreate(ApartmentParams):
    notification_destination: Literal["email"] = "email"
    user_email: EmailStr


class SubscriptionRead(SubscriptionCreate):
    id: UUID
    user_id: UUID


class SubscriptionUpdate(BaseModel):
    pass
