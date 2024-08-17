from typing import Generator
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from subscriptions.models import User
from subscriptions.database import SessionLocal
from sqlalchemy.orm import Session
from subscriptions.core.config import settings
from subscriptions.schemas.users import TokenPayload
import jwt
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from subscriptions.repository.users import user as user_repository


reusable_oauth2 = OAuth2PasswordBearer(tokenUrl="/users/access-token")


def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


DB = Annotated[Session, Depends(get_db)]
Token = Annotated[str, Depends(reusable_oauth2)]


def get_current_user(db: DB, token: Token) -> User:
    try:
        payload = jwt.decode(
            token, settings.secret_key, algorithms=[settings.algorithm]
        )
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = user_repository.get_by_id(db, token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
