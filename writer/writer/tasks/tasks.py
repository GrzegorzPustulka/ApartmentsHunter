from writer.celery_app import celery_app
from typing import Any

from writer.schemas import ApartmentCreate
from writer.repositories.apartments import apartment_repository
from subscriptions.database import SessionLocal


@celery_app.task(name="process_offer_in_writer")
def process_offer(prices: dict[str, Any], offer: dict[str, Any]) -> None:
    prices["price"] = prices["rent"] + prices.get("administrative_rent", 0)
    offer = ApartmentCreate(**prices, **offer)

    db_session = SessionLocal()
    try:
        apartment_repository.create(db_session, offer)
    finally:
        db_session.close()


@celery_app.task()
def send_to_sender(data: list[dict[str, Any]]) -> None:
    celery_app.send_task(
        "sender.tasks.send_apartment_notification",
        args=data,
        queue="sender_queue",
    )
