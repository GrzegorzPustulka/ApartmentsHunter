from matcher.celery_app import celery_app
from typing import Any


@celery_app.task()
def send_to_sender(offer: dict[str, Any], data: dict[str, str]) -> None:
    celery_app.send_task(
        "sender.tasks.process_offer_in_sender", args=[offer, data], queue="sender_queue"
    )
