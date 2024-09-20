from typing import Generic, Type, TypeVar

from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import insert, select, delete, update

from subscriptions.models import Base
from subscriptions.models import SubscriptionStatus

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class BaseRepository(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    def create(self, db: Session, obj_in: CreateSchemaType) -> None:
        db.execute(insert(self.model).values(obj_in.model_dump()))
        db.commit()

    def get_by_id(self, db: Session, id: str) -> ModelType | None:
        return db.execute(
            select(self.model).where(self.model.id == id)
        ).scalar_one_or_none()

    def get_all(self, db: Session) -> list[ModelType] | None:
        return db.query(self.model).all()

    def delete_by_id(self, db: Session, id: str) -> None:
        db.execute(delete(self.model).where(self.model.id == id))
        db.commit()

    def update_status(
        self, db: Session, id: str, new_status: SubscriptionStatus
    ) -> None:
        db.execute(
            update(self.model).where(self.model.id == id).values(status=new_status)
        )
        db.commit()

    # def update(self, db: Session, id: str, obj_in: UpdateSchemaType) -> ModelType:
    #     result = db.execute(
    #         update(self.model)
    #         .where(self.model.id == id)
    #         .values(obj_in.model_dump())
    #         .returning(self.model)
    #     )
    #     db.commit()
    #     return result.scalar_one()
