from pydantic import BaseModel, EmailStr
from typing import Literal
from catalogue.schemas.apartment import ApartmentParams, ApartmentRead


class SubscriptionCreate(ApartmentParams):
    notification_destination: Literal["email"] = "email"
    user_email: EmailStr


class SubscriptionRead(ApartmentRead):
    notification_destination: Literal["email"] = "email"
    user_email: EmailStr


class SubscriptionUpdate(BaseModel):
    pass
