from hunter.celery_app import celery_app
from hunter.schemas import Apartment
from hunter.services.redis_service import RedisService
from hunter.services.scraper_service import ScraperService
import logging

log = logging.getLogger(__name__)


@celery_app.task()
def scrape_and_send(city: str) -> None:
    scraper = ScraperService(city)
    redis = RedisService()
    offers: list[Apartment] = scraper.scrape_latest_offers()
    log.info("dzialam")
    for offer in offers:
        if not redis.offer_exists(city, offer.link):
            redis.add_offer(city, offer.link)
            celery_app.send_task('process_offer_in_pricer', args=[offer.model_dump()], queue='pricer_queue')
            log.info(f"Sending {offer.link}")
            redis.remove_offer(city)