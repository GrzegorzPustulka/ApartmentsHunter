from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated, Any
from pymongo.database import Database
from catalogue.db import get_db
from catalogue.schemas.apartments import ApartmentParams, ApartmentRead

router = APIRouter(prefix="/v1/apartments", tags=["apartments"])

Session = Annotated[Database, Depends(get_db)]


@router.post("/", response_model=list[ApartmentRead])
async def get_apartments(params: ApartmentParams,  db: Session):
    query = build_query(params)
    collection = params.city
    documents = list(db[collection].find(query))

    if not documents:
        raise HTTPException(status_code=404, detail="No apartments found matching the criteria.")

    results = [ApartmentRead(**document) for document in documents]

    return results


def build_query(params: ApartmentParams) -> dict[str, Any]:
    query = {}

    price_query = {}
    if params.maximum_price:
        price_query["$lte"] = params.maximum_price
    if params.minimum_price:
        price_query["$gte"] = params.minimum_price
        query["price"] = price_query

    area_query = {}
    if not params.unknown_area:
        if params.maximum_area:
            area_query["$lte"] = params.maximum_area
        if params.minimum_area:
            area_query["$gte"] = params.minimum_area
        query["size"] = area_query  # todo: to powinno byc area

    optional_fields = ["current", "heating", "water", "rubbish", "gas", "internet"]
    for field in optional_fields:
        value = getattr(params, field)
        if value != "wszystko":
            query[field] = value
    return query