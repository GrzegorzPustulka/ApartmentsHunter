from typing import Any
from pricer.schemas import PricerSchema
from pricer.celery_app import celery_app, model
from pricer.resources.prompts import prompt_price_olx
import logging
import json


log = logging.getLogger(__name__)


@celery_app.task(name="process_offer_in_pricer")
def process_offer(offer: dict[str, Any]) -> dict[str, Any]:
    message = create_prompt(offer)
    response = model.generate_content(message)
    response_json = json.loads(response.text)
    pricer_schemas = PricerSchema(**response_json)
    return pricer_schemas.model_dump()


def create_prompt(offer: dict[str, Any]) -> str:
    return (
        prompt_price_olx
        + "DATA:"
        + f" rent: {offer['price']}"
        + f" administrative rent: {offer['rent']}"
        + f" description: {offer['description']}"
    )
