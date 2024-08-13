from celery import Celery
from kombu import Exchange, Queue
from matcher.config import settings

celery_app = Celery(
    "matcher",
    broker=settings.rabbit_url,
    backend="redis://redis:6379/0",
    include=["matcher.tasks"],
)

default_exchange = Exchange("matcher", type="direct")

celery_app.conf.task_queues = (
    Queue("matcher_queue", default_exchange, routing_key="matcher.#"),
)

celery_app.conf.task_default_queue = "matcher_queue"
celery_app.conf.task_default_exchange = "matcher"
celery_app.conf.task_default_routing_key = "matcher.default"

celery_app.conf.task_routes = {
    "matcher.tasks.process_offer_in_sender": {"queue": "matcher_queue"},
}
