from celery import Celery
from kombu import Exchange, Queue
from sender.config import settings


celery_app = Celery(
    "sender",
    broker=settings.rabbit_url,
    backend="redis://redis:6379/0",
    include=["sender.tasks"],
)

sender_exchange = Exchange("sender", type="direct")

celery_app.conf.task_queues = (
    Queue("sender_queue", sender_exchange, routing_key="sender.#"),
)

celery_app.conf.task_default_queue = "sender_queue"
celery_app.conf.task_default_exchange = "sender"
celery_app.conf.task_default_routing_key = "sender.default"

celery_app.conf.task_routes = {
    "sender.tasks.send_apartment_notification_task": {"queue": "sender_queue"},
    "sender.tasks.send_password_reset_email": {"queue": "sender_queue"},
}
