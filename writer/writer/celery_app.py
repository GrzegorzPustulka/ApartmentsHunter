from celery import Celery
from kombu import Exchange, Queue
from writer.config import settings

celery_app = Celery(
    "writer",
    broker=settings.rabbit_url,
    backend="redis://redis:6379/0",
    include=["writer.tasks.tasks"],
)

writer_exchange = Exchange("writer", type="direct")

celery_app.conf.task_queues = (
    Queue("writer_queue", writer_exchange, routing_key="writer.#"),
)

celery_app.conf.task_default_queue = "writer_queue"
celery_app.conf.task_default_exchange = "writer"
celery_app.conf.task_default_routing_key = "writer.default"

celery_app.conf.task_routes = {
    "writer.tasks.tasks.process_offer_in_pricer": {"queue": "writer_queue"},
}
