from typing import Any

from pricer.celery_app import celery_app, model
from pricer.resources.prompts import prompt_price_olx
import logging

log = logging.getLogger(__name__)


@celery_app.task(name="process_offer_in_pricer")
def process_offer(offer: dict[str, Any], price: float, url: str) -> None:
    message = create_prompt(offer, price)
    response = model.generate_content(message)
    print(url, response.text)


def create_prompt(offer: dict[str, Any], price: float) -> str:
    return (
        prompt_price_olx
        + f"DANE:"
        +  f" cena: {price}"
        + f" czynsz administracyjny: {offer['rent']}"
        + f" opis: {offer['description']}"
    )
