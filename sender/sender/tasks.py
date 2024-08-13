from typing import Any
from sender.celery_app import celery_app
from sender.services.email_service import EmailService


@celery_app.task(name="sender.tasks.process_offer_in_sender")
def process_offer(offer: dict[str, Any], data: dict[str, str]) -> None:
    if data["notification_destination"] == "email":
        sender = EmailService(data["user_email"])
        sender.send_email(offer)
