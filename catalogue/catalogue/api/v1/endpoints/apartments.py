from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from catalogue.query import build_query
from pymongo.database import Database
from catalogue.db import get_db
from catalogue.schemas.apartments import ApartmentParams, ApartmentRead

router = APIRouter(prefix="/v1/apartments", tags=["apartments"])

Session = Annotated[Database, Depends(get_db)]


@router.post("/", response_model=list[ApartmentRead])
async def get_apartments(params: ApartmentParams, db: Session):
    query = build_query(params)
    collection = params.city
    documents = list(db[collection].find(query))

    if not documents:
        raise HTTPException(
            status_code=404, detail="No apartments found matching the criteria."
        )

    return [ApartmentRead(**document) for document in documents]
