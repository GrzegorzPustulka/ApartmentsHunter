from typing import Any
from sender.celery_app import celery_app
from sender.services.email_service import (
    send_apartment_notification,
    send_password_reset_email,
)
from sender.services import discord_service, telegram_service

discord_service = discord_service.DiscordService()
telegram_service = telegram_service.TelegramService()


@celery_app.task(name="sender.tasks.send_apartment_notification")
def send_apartment_notification_task(data: dict[str, Any]) -> None:
    notification_destination = data["notification_destination"]
    if notification_destination == "email":
        notification_endpoint = data["notification_endpoint"]
        send_apartment_notification(notification_endpoint, data)
    elif notification_destination == "discord":
        notification_endpoint = int(data["notification_endpoint"])
        discord_service.send_apartment_notification(notification_endpoint, data)
    elif notification_destination == "telegram":
        notification_endpoint = int(data["notification_endpoint"])
        telegram_service.send_apartment_notification(notification_endpoint, data)


@celery_app.task(name="sender.tasks.send_password_reset_email")
def send_password_reset_email_task(email: str, reset_link: str) -> None:
    send_password_reset_email(email, reset_link)
