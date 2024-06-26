from celery import Celery
from hunter.config import settings

celery_app = Celery("tasks", broker=settings.rabbitmq_url, backend=settings.redis_url)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)
