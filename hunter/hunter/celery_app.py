from celery import Celery
from celery.schedules import crontab

from hunter.config import settings

celery_app = Celery(
    "hunter",
    broker=settings.rabbit_url,
    backend="redis://redis:6379/0",
    include=["hunter.tasks.periodic_tasks"],
)

celery_app.conf.update(
    timezone="UTC",
    enable_utc=True,
)

beat_schedule = {}
for city in settings.cities:
    beat_schedule[f"scrape-{city}-every-1-minutes"] = {
        "task": "hunter.tasks.periodic_tasks.scrape_and_send",
        "schedule": crontab(minute="*/1"),
        "args": (city,),
    }

celery_app.conf.beat_schedule = beat_schedule
celery_app.conf.timezone = "UTC"
