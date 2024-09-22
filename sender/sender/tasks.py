from typing import Any
from sender.celery_app import celery_app
from sender.services.email_service import (
    send_apartment_notification,
    send_password_reset_email,
)


@celery_app.task(name="sender.tasks.send_apartment_notification")
def send_apartment_notification_task(email: str, data: dict[str, Any]) -> None:
    send_apartment_notification(email, data)


@celery_app.task(name="sender.tasks.send_password_reset_email")
def send_password_reset_email_task(email: str, reset_link: str) -> None:
    send_password_reset_email(email, reset_link)
