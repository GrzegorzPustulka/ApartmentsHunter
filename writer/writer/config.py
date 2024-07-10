from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    # RabbitMQ
    rabbit_host: str = "localhost"
    rabbit_user: str = "guest"
    rabbit_password: SecretStr = SecretStr("guest")
    celery_queue: str = "pricer"
    rabbit_url: str = (
        f"pyamqp://{rabbit_user}:{rabbit_password.get_secret_value()}@{rabbit_host}//"
    )
    mongo_name: str = "writer"
    mongo_port: int = 27017
    mongo_host: str = "localhost"
    mongo_uri: str = f"mongodb://{mongo_host}:{mongo_port}/{mongo_name}"


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
