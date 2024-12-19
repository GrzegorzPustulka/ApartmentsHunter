from celery import Celery
from celery.schedules import crontab
from kombu import Exchange, Queue
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

default_exchange = Exchange("hunter", type="direct")

celery_app.conf.task_queues = (
    Queue("hunter_queue", default_exchange, routing_key="hunter.#"),
)

celery_app.conf.task_default_queue = "hunter_queue"
celery_app.conf.task_default_exchange = "hunter"
celery_app.conf.task_default_routing_key = "hunter.default"

celery_app.conf.task_routes = {
    "hunter.tasks.periodic_tasks.scrape_and_send": {"queue": "hunter_queue"},
}

beat_schedule = {}
for city in settings.cities:
    beat_schedule[f"scrape-{city}-every-5-minutes"] = {
        "task": "hunter.tasks.periodic_tasks.scrape_and_send",
        "schedule": crontab(minute="*/5"),
        "args": (city,),
    }

celery_app.conf.beat_schedule = beat_schedule
celery_app.conf.timezone = "UTC"
