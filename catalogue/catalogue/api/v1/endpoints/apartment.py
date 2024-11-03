from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from catalogue.query import find_properties
from sqlalchemy.orm import Session
from subscriptions.api.v1.dependencies import get_db
from sqlalchemy import select
from subscriptions.models import Apartment
from catalogue.schemas.apartment import ApartmentParams, ApartmentRead

router = APIRouter(prefix="/api/v1/apartments", tags=["apartments"])

Session = Annotated[Session, Depends(get_db)]


@router.post("/", response_model=list[ApartmentRead])
async def get_apartments(params: ApartmentParams, db: Session) -> list[ApartmentRead]:
    query = find_properties("apartment", **params.model_dump())
    results = db.scalars(query)
    if not results:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No results")
    apartments = [ApartmentRead(**apartment.as_dict()) for apartment in results]

    return apartments


@router.get("")
async def get_apartments(db: Session) -> list[ApartmentRead]:
    results = db.scalars(select(Apartment))
    if not results:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No results")
    apartments = [ApartmentRead(**apartment.as_dict()) for apartment in results]

    return apartments
