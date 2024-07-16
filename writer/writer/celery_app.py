from celery import Celery
from kombu import Exchange, Queue
from writer.config import settings


celery_app = Celery(
    "writer",
    broker=settings.rabbit_url,
    backend="redis://localhost",
    include=["writer.tasks.tasks"],
)

default_exchange = Exchange("default", type="direct")

celery_app.conf.task_queues = (
    Queue("default", default_exchange, routing_key="default"),
    Queue("writer_queue", default_exchange, routing_key="writer_queue"),
)

celery_app.conf.task_default_queue = "default"
celery_app.conf.task_default_exchange = "default"
celery_app.conf.task_default_routing_key = "default"

celery_app.conf.task_routes = {
    "process_offer_in_pricer": {"queue": "writer_queue"},
}
