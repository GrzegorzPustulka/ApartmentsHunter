from hunter.celery_app import celery_app
from hunter.config import settings
from celery.schedules import crontab

from hunter.schemas import Apartment
from hunter.services.redis_service import RedisService
from hunter.services.scraper_service import ScraperService
import logging

log = logging.getLogger(__name__)


@celery_app.task
def scrape_and_send(city: str) -> None:
    scraper = ScraperService(city)
    redis = RedisService()
    offers: list[Apartment] = scraper.scrape_latest_offers()
    for offer in offers:
        if not redis.offer_exists("city", offer.link):
            redis.add_offer("city", offer.link)
            celery_app.send_task('process_offer_in_service_b', args=[offer.model_dump()], queue='service_b_queue')

            redis.remove_offer("city")


for city in settings.cities:
    celery_app.conf.beat_schedule[f"scrape-{city}-every-5-minutes"] = {
        "task": "hunter.tasks.periodic_tasks.scrape_and_send",
        "schedule": crontab(minute="*/5"),
        "args": (city,),
    }
celery_app.conf.timezone = "UTC"
