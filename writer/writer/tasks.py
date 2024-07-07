from writer.celery_app import celery_app
from typing import Any


@celery_app.task(name="process_offer_in_writer")
def process_offer(prices: dict[str, Any], offer: dict[str, Any]) -> None:
    print(f"Offer: {offer}")
    print(f"Prices: {prices}")
