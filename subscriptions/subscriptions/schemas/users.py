from pydantic import BaseModel, EmailStr, SecretStr
from uuid import UUID


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(UserCreate):
    pass


class UserRead(UserCreate):
    id: UUID
    subscription_limit: int
