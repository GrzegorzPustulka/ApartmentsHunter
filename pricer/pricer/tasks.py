from typing import Any

from pricer.celery_app import celery_app, model
from pricer.resources.prompts import prompt_price_olx
import logging

log = logging.getLogger(__name__)


@celery_app.task(name="process_offer_in_pricer")
def process_offer(offer: dict[str, Any]) -> None:
    message = create_prompt(offer)
    response = model.generate_content(message)
    print(response.text)


def create_prompt(offer: dict[str, Any]) -> str:
    return (
        f"cena: {offer['rent']}"
        + f" czynsz administracyjny: {offer['administrative_rent']}"
        + f" opis: {offer['description']}"
        + prompt_price_olx()
    )
