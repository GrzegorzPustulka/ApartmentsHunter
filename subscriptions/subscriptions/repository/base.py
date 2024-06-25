from typing import Generic, Type, TypeVar

from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import insert, select

from subscriptions.models import Base

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

    # def get_all(self, db: Session) -> list[ModelType] | None:
    #     result = db.scalars(select(ModelType))

    # def update(self, db: Session, id: str, obj_in: UpdateSchemaType) -> ModelType:
    #     result = db.execute(
    #         update(self.model)
    #         .where(self.model.id == id)
    #         .values(obj_in.model_dump())
    #         .returning(self.model)
    #     )
    #     db.commit()
    #     return result.scalar_one()

    # def remove(self, db: Session, id: str) -> ModelType:
    #     try:
    #         result = db.execute(
    #             delete(self.model).where(self.model.id == id).returning(self.model)
    #         )
    #         db.commit()
    #         return result.scalar_one()
    #     except IntegrityError:
    #         db.rollback()
    #         raise HTTPException(
    #             status_code=status.HTTP_409_CONFLICT,
    #             detail="Cannot delete the record due to associated records in other tables.",
    #         )
