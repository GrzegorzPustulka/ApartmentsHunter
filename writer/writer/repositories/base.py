from typing import Generic, Type, TypeVar

from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import insert, select, delete

from subscriptions.models import Base

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)


class BaseRepository(Generic[ModelType, CreateSchemaType]):
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
