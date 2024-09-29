from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from catalogue.query import find_properties
from sqlalchemy.orm import Session
from subscriptions.api.v1.dependencies import get_db
from catalogue.schemas.apartment import ApartmentParams, ApartmentRead

router = APIRouter(prefix="/api/v1/apartments", tags=["apartments"])

Session = Annotated[Session, Depends(get_db)]


@router.post("/", response_model=list[ApartmentRead])
async def get_apartments(params: ApartmentParams, db: Session):
    pass
