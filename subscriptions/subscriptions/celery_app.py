from celery import Celery
from kombu import Exchange, Queue
from subscriptions.core.config import settings

celery_app = Celery(
    "subscriptions",
    broker=settings.rabbit_url,
    backend="redis://redis:6379/0",
    include=["subscriptions.tasks"],
)

default_exchange = Exchange("subscriptions", type="direct")

celery_app.conf.task_queues = (
    Queue("subscriptions_queue", default_exchange, routing_key="subscriptions.#"),
)

celery_app.conf.task_default_queue = "subscriptions_queue"
celery_app.conf.task_default_exchange = "subscriptions"
celery_app.conf.task_default_routing_key = "subscriptions.default"

celery_app.conf.task_routes = {
    "subscriptions.tasks.send_password_reset_email": {"queue": "subscriptions_queue"},
}
