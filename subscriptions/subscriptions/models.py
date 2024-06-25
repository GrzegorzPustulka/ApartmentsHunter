from uuid import UUID, uuid4
from sqlalchemy import String
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
    website: Mapped[str] = mapped_column(String(30))
    city: Mapped[str] = mapped_column(String(30))
    category: Mapped[str] = mapped_column(String(30))
    subcategory: Mapped[str] = mapped_column(String(30))
    development_type: Mapped[str] = mapped_column(String(30))
    room_count: Mapped[str] = mapped_column(String(30))
    minimum_price: Mapped[int]
    maximum_price: Mapped[int]
    minimum_area: Mapped[int]
    maximum_area: Mapped[int]
    floor_level: Mapped[str] = mapped_column(String(30))
    furnishing: Mapped[str] = mapped_column(String(30))
