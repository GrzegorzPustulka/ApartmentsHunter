from typing import Any

from hunter.celery_app import celery_app
from hunter.services.redis_service import RedisService
from celery import chain
from hunter.schemas import SchemaForPricer, SchemaForWriter
from hunter.services.offer_scraper_service import OfferScraperService
from hunter.services.details_scraper_service import DetailsScraperService
import logging

log = logging.getLogger(__name__)


@celery_app.task()
def scrape_and_send(city: str) -> None:
    offer_scraper = OfferScraperService(city)
    redis = RedisService()
    offers = offer_scraper.scrape_latest_offers()
    for offer in offers:
        if redis.offer_exists(city, offer.link):
            continue

        details_scraper = DetailsScraperService(offer.link)
        if details_offer := details_scraper.scrape_offer_details():
            redis.add_offer(city, offer.link)
            log.info(f"Sending {offer.link}")
            schema_for_pricer = SchemaForPricer(
                price=offer.price, **details_offer.model_dump()
            )
            schema_for_writer = SchemaForWriter(
                **offer.model_dump(), **details_offer.model_dump()
            )
            chain(
                send_to_pricer.s(schema_for_pricer.model_dump()),
                process_writer.s(schema_for_writer.model_dump()),
            ).apply_async()
            redis.remove_offer(city)


@celery_app.task()
def send_to_pricer(offer: dict[str, Any]):
    result = celery_app.send_task(
        "process_offer_in_pricer", args=[offer], queue="pricer_queue"
    )
    return result.id


# TODO: this will need to be improved in the future
@celery_app.task(bind=True, default_retry_delay=60)
def process_writer(self, pricer_task_id: str, offer: dict[str, Any], retry_count=0):
    try:
        result = celery_app.AsyncResult(pricer_task_id)
        prices = result.result
        if prices is None:
            raise ValueError("Result not ready")

        celery_app.send_task(
            "process_offer_in_writer", args=[prices, offer], queue="writer_queue"
        )

    except ValueError:
        if retry_count < 60:
            retry_count += 1
            self.retry(args=[pricer_task_id, offer, retry_count], countdown=60)
        else:
            log.error(f"Max retry count reached for task {pricer_task_id}")
