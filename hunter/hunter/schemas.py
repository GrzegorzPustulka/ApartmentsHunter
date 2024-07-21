from pydantic import BaseModel, field_validator
import logging

log = logging.getLogger(__name__)


class Offer(BaseModel):
    title: str
    link: str
    city: str
    district: str
    date: str
    price: float
    area: float

    @field_validator("link", mode="before")
    @classmethod
    def validate_title(cls, v: str) -> str:
        # TODO: In the future, we will introduce Otodom
        if "otodom" in v:
            raise ValueError("Otodom not allowed.")

        return v

    @field_validator("price", "area", mode="before")
    @classmethod
    def validate_price_and_area(cls, v: str) -> int | float:
        allowed_chars = "0123456789.,"
        cleaned_price = "".join(char for char in v if char in allowed_chars)
        cleaned_price = cleaned_price.replace(",", ".")
        return float(cleaned_price)


class DetailsOffer(BaseModel):
    rent: float | None = None
    description: str
    images_url: list[str]

    building_type: str
    number_of_rooms: str
    floor_level: str | None = None
    is_furnished: bool
    is_private_offer: bool

    @field_validator("rent", mode="before")
    @classmethod
    def validate_rent(cls, v: str):
        if len(v) == 0:
            return None

        allowed_chars = "0123456789.,"
        cleaned_price = "".join(char for char in v if char in allowed_chars)
        cleaned_price = cleaned_price.replace(",", ".")
        return float(cleaned_price)
