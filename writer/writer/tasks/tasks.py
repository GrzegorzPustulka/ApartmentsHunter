from writer.celery_app import celery_app
from typing import Any

from writer.repositories.offer_repository import OfferRepositoryCache
from writer.schemas import CreateOffer


@celery_app.task(name="process_offer_in_writer")
def process_offer(prices: dict[str, Any], offer: dict[str, Any]) -> None:
    offer = CreateOffer(**prices, **offer)
    repository = OfferRepositoryCache.get_repository(offer.city)
    repository.add_offer(offer.model_dump())
