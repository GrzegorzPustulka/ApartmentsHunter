from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    # RabbitMQ
    rabbit_host: str = "rabbitmq"
    rabbit_user: str = "guest"
    rabbit_password: SecretStr = SecretStr("guest")
    celery_queue: str = "sender"
    rabbit_url: str = (
        f"pyamqp://{rabbit_user}:{rabbit_password.get_secret_value()}@{rabbit_host}//"
    )

    # SMTP
    smtp_server: str = "mailhog"
    smtp_port: int = 1025
    sender_email: str = "apartments@hunter.com"
    smtp_password: SecretStr = SecretStr("")


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
