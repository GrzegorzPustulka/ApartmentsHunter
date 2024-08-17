from sqlalchemy.orm import Session
from sqlalchemy import select
from subscriptions.models import User
from subscriptions.schemas.users import UserCreate, UserUpdate
from subscriptions.core.security import get_password_hash, verify_password
from subscriptions.repository.base import BaseRepository


class UserRepository(BaseRepository[User, UserCreate, UserUpdate]):
    @staticmethod
    def get_by_email(db: Session, email: str) -> User | None:
        return db.execute(select(User).where(User.email == email)).scalars().first()

    def create(self, db: Session, user_in: UserCreate) -> None:
        user_in = UserCreate(
            email=user_in.email, password=get_password_hash(user_in.password)
        )
        super().create(db=db, obj_in=user_in)

    def authenticate(self, db: Session, email: str, password: str) -> User | None:
        db_user = self.get_by_email(db, email)
        if not db_user:
            return None
        if not verify_password(password, db_user.password):
            return None
        return db_user


user = UserRepository(User)
