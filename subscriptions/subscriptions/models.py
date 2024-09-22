from uuid import UUID, uuid4
from sqlalchemy import String, ARRAY, ForeignKey
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
    declared_attr,
    relationship,
)
from sqlalchemy import Enum as SQLAlchemyEnum
from enum import Enum


class SubscriptionStatus(Enum):
    ACTIVE = "active"
    PAUSED = "paused"
    DELETED = "deleted"


class Base(DeclarativeBase):
    id: Mapped[UUID] = mapped_column(
        primary_key=True, index=True, unique=True, default=uuid4
    )

    @classmethod
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower() + "s"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self) -> str:
        return f"<{self.__class__.__name__}({', '.join(f'{k}={v}' for k, v in self.as_dict().items())})>"

    def __str__(self) -> str:
        return f"{self.__class__.__name__}({', '.join(f'{k}={v}' for k, v in self.as_dict().items())})"


class Subscription(Base):
    notification_destination: Mapped[str]
    user_email: Mapped[str]

    city: Mapped[str] = mapped_column(String(30))
    district: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    minimum_price: Mapped[int | None]
    maximum_price: Mapped[int | None]
    minimum_area: Mapped[int | None]
    maximum_area: Mapped[int | None]
    deposit: Mapped[int | None]
    building_type: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    number_of_rooms: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    is_furnished: Mapped[bool | None]
    is_private_offer: Mapped[bool | None]
    bedrooms: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    standard: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    status: Mapped[str] = mapped_column(String, default=SubscriptionStatus.ACTIVE.value)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["UUID"] = relationship("User", back_populates="subscriptions")


class Apartment(Base):
    link: Mapped[str] = mapped_column(unique=True)
    city: Mapped[str]
    district: Mapped[str]
    price: Mapped[float]
    deposit: Mapped[float | None]
    standard: Mapped[str]
    bedrooms: Mapped[str]
    title: Mapped[str]
    date: Mapped[str]
    area: Mapped[float]
    building_type: Mapped[str]
    number_of_rooms: Mapped[str]
    is_furnished: Mapped[bool]
    is_private_offer: Mapped[bool]


class User(Base):
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    subscription_limit: Mapped[int] = mapped_column(default=3)

    subscriptions: Mapped[list["Subscription"]] = relationship(
        "Subscription", back_populates="user", cascade="all, delete-orphan"
    )
