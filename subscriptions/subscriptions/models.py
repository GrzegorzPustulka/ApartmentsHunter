from uuid import UUID, uuid4
from sqlalchemy import String, ARRAY, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, declared_attr


class Base(DeclarativeBase):
    id: Mapped[UUID] = mapped_column(
        primary_key=True, index=True, unique=True, default=uuid4
    )

    @classmethod
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


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
    floor_level: Mapped[list[int] | None] = mapped_column(ARRAY(Integer))
    is_furnished: Mapped[bool | None]
    is_private_offer: Mapped[bool | None]
    bedrooms: Mapped[list[int] | None] = mapped_column(ARRAY(Integer))
    standard: Mapped[list[str] | None] = mapped_column(ARRAY(String))
