from pydantic import SecretStr
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # RabbitMQ
    rabbit_host: str = "rabbitmq"
    rabbit_user: str = "guest"
    rabbit_password: SecretStr = SecretStr("guest")
    celery_queue: str = "pricer"
    rabbit_url: str = (
        f"pyamqp://{rabbit_user}:{rabbit_password.get_secret_value()}@{rabbit_host}//"
    )


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
