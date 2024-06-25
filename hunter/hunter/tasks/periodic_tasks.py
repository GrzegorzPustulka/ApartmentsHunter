from hunter.celery_app import celery_app
from hunter.config import settings
from celery.schedules import crontab
from hunter.services.scraper import ScraperService


@celery_app.task
def scrape_and_send(city: str) -> None:
    scraper = ScraperService(city)

    offer = scraper.scrape_latest_offer()


for city in settings.cities:
    celery_app.conf.beat_schedule[f"scrape-{city}-every-5-minutes"] = {
        'task': 'app.tasks.periodic_tasks.scrape_and_send',
        'schedule': crontab(minute='*/5'),
        'args': (city,),
    }
celery_app.conf.timezone = 'UTC'
