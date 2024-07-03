from pydantic import BaseModel, field_validator
import logging

log = logging.getLogger(__name__)


class Offer(BaseModel):
    title: str | None = None
    link: str
    city: str
    district: str
    date: str
    price: float
    size: float | None = None

    @field_validator("link", mode="before")
    @classmethod
    def validate_title(cls, v: str) -> str:
        # TODO: In the future, we will introduce Otodom
        if "otodom" in v:
            raise ValueError("Otodom not allowed.")

        if len(v) > 0:
            return v
        log.error(f"Link is empty: {str(cls)}")
        raise ValueError("Link cannot be empty.")

    @field_validator("price", mode="before")
    @classmethod
    def validate_price(cls, v: str) -> int | float:
        if len(v) == 0:
            log.error(f"Price is empty: {str(cls)}")
            raise ValueError("Price cannot be empty.")

        allowed_chars = "0123456789.,"
        cleaned_price = "".join(char for char in v if char in allowed_chars)
        cleaned_price = cleaned_price.replace(",", ".")
        return float(cleaned_price)

    @field_validator("size", mode="before")
    @classmethod
    def validate_size(cls, v: str) -> float | None:
        if len(v) == 0:
            return None

        allowed_chars = "0123456789.,"
        cleaned_price = "".join(char for char in v if char in allowed_chars)
        cleaned_price = cleaned_price.replace(",", ".")
        return float(cleaned_price)


class DetailsOffer(BaseModel):
    rent: float | None = None
    description: str | None = None
    images_url: list[str]

    @field_validator("rent", mode="before")
    @classmethod
    def validate_rent(cls, v: str):
        if len(v) == 0:
            return None

        allowed_chars = "0123456789.,"
        cleaned_price = "".join(char for char in v if char in allowed_chars)
        cleaned_price = cleaned_price.replace(",", ".")
        return float(cleaned_price)
