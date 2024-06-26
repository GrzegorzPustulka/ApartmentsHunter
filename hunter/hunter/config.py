from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    olx_base_url: str = "https://www.olx.pl/nieruchomosci/mieszkania/wynajem/"
    cities: list[str] = [
        "krakow",
        "warszawa",
        "poznan",
        "wroclaw",
        "gdansk",
        "katowice",
    ]
    offer_limit: int = 90
    offer_offset: int = 2

    redis_url: str = "redis://redis:6379/0"
    rabbitmq_url: str = "amqp://guest:guest@rabbitmq:5672/"


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
