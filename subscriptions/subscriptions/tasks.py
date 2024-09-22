from subscriptions.celery_app import celery_app
from subscriptions.core.config import settings


@celery_app.task()
def send_password_reset_email(email: str, token: str):
    reset_link = f"{settings.frontend_url}/reset-password/{token}"
    return celery_app.send_task(
        "sender.tasks.send_password_reset_email",
        args=[email, reset_link],
        queue="sender_queue",
    )
