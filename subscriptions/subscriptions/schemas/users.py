from pydantic import BaseModel, EmailStr, SecretStr
from uuid import UUID


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(UserCreate):
    pass


class UserRead(BaseModel):
    id: UUID
    email: EmailStr
    subscription_limit: int


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    sub: str | None = None


class PasswordResetRequest(BaseModel):
    email: EmailStr


class PasswordReset(BaseModel):
    new_password: str
