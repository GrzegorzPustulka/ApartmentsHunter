from pricer.celery_app import celery_app
import logging

log = logging.getLogger(__name__)


@celery_app.task(name="process_offer_in_pricer")
def process_offer(offer: dict) -> None:
    print(f"Processing offer in Pricer: {offer}")
