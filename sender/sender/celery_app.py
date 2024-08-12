from celery import Celery
from kombu import Exchange, Queue
from sender.config import settings


celery_app = Celery(
    "pricer",
    broker=settings.rabbit_url,
    backend="redis://redis:6379/0",
    include=["pricer.tasks"],
)

default_exchange = Exchange("default", type="direct")

celery_app.conf.task_queues = (
    Queue("default", default_exchange, routing_key="default"),
    Queue("sender_queue", default_exchange, routing_key="sender_queue"),
)

celery_app.conf.task_default_queue = "default"
celery_app.conf.task_default_exchange = "default"
celery_app.conf.task_default_routing_key = "default"

celery_app.conf.task_routes = {
    "process_offer_in_sender": {"queue": "sender_queue"},
}
