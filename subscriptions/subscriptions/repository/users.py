from sqlalchemy.orm import Session
from sqlalchemy import select
from subscriptions.models import User
from subscriptions.schemas.users import UserCreate, UserUpdate
from subscriptions.core.security import get_password_hash
from subscriptions.repository.base import BaseRepository


class UserRepository(BaseRepository[User, UserCreate, UserUpdate]):
    @staticmethod
    def get_by_email(db: Session, email: str) -> User | None:
        return db.execute(select(User).where(User.email == email)).first()

    def create(self, db: Session, user_in: UserCreate) -> None:
        user_in = UserCreate(
            email=user_in.email, password=get_password_hash(user_in.password)
        )
        super().create(db=db, obj_in=user_in)


user = UserRepository(User)
