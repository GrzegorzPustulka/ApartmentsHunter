from hunter.celery_app import celery_app
from hunter.schemas import Offer, DetailsOffer
from hunter.services.redis_service import RedisService
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
            celery_app.send_task('process_offer_in_pricer', args=[details_offer.model_dump(exclude={"images_url"})], queue='pricer_queue')
            log.info(f"Sending {offer.link}")
            redis.remove_offer(city)