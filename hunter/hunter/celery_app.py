from celery import Celery
from hunter.config import settings

celery_app = Celery(
    "hunter", broker=settings.rabbit_url, include=["hunter.tasks.periodic_tasks"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)
