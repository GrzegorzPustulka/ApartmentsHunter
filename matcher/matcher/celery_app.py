from celery import Celery
from matcher.config import settings


celery_app = Celery(
    "matcher",
    broker=settings.rabbit_url,
    backend="redis://redis:6379/0",
    include=["matcher.tasks"],
)

celery_app.conf.update(
    timezone="UTC",
    enable_utc=True,
)

celery_app.conf.timezone = "UTC"
