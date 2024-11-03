from pydantic import SecretStr
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # Scraper
    olx_base_url: str = "https://www.olx.pl/nieruchomosci/mieszkania/wynajem/"
    cities: list[str] = [
        "krakow",
        # "warszawa",
        # "poznan",
        # "wroclaw",
        # "gdansk",
        # "katowice",
    ]
    offer_offset: int = 2
    offer_limit: int = 53

    # Redis
    redis_host: str = "redis"
    redis_port: int = 6379
    redis_db: int = 0
    redis_offer_limit: int = 48

    # RabbitMQ
    rabbit_host: str = "rabbitmq"
    rabbit_user: str = "guest"
    rabbit_password: SecretStr = SecretStr("guest")
    rabbit_url: str = (
        f"pyamqp://{rabbit_user}:{rabbit_password.get_secret_value()}@{rabbit_host}//"
    )


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
