from typing import Any
from pricer.schemas import PricerSchema
from pricer.celery_app import celery_app, model
from pricer.resources.prompts import prompt_price_olx
import logging
import requests
from PIL import Image
from io import BytesIO
import json


log = logging.getLogger(__name__)


@celery_app.task(name="process_offer_in_pricer")
def process_offer(offer: dict[str, Any]) -> dict[str, Any]:
    message = create_prompt(offer)
    images = get_images(offer["images_url"])
    response = model.generate_content([message, *images])
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


def get_images(urls: list[str]) -> list[BytesIO]:
    images = []
    for url in urls:
        response = requests.get(url)
        image = Image.open(BytesIO(response.content))
        images.append(image)
    return images
