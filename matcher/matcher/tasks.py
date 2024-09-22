from matcher.celery_app import celery_app
from typing import Any


@celery_app.task()
def send_to_sender(email: str, data: dict[str, str]) -> None:
    celery_app.send_task(
        "sender.tasks.send_apartment_notification",
        args=[email, data],
        queue="sender_queue",
    )
