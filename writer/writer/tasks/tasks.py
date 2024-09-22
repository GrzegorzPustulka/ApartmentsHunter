from writer.celery_app import celery_app
from typing import Any

from writer.repositories.offer_repository import OfferRepositoryCache
from writer.schemas import ApartmentCreate
from writer.repositories.apartments import apartment_repository
from subscriptions.database import SessionLocal


@celery_app.task(name="process_offer_in_writer")
def process_offer(prices: dict[str, Any], offer: dict[str, Any]) -> None:
    prices["price"] = prices["rent"] + prices.get("administrative_rent", 0)
    offer = ApartmentCreate(**prices, **offer)

    # TODO: To będzie trzeba usunac po wprowadzeniu postgresql
    repository = OfferRepositoryCache.get_repository(offer.city)
    repository.add_offer(offer.model_dump())

    db_session = SessionLocal()
    try:
        apartment_repository.create(db_session, offer)
    finally:
        db_session.close()
