from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    # RabbitMQ
    rabbit_host: str = "localhost"
    rabbit_user: str = "guest"
    rabbit_password: SecretStr = SecretStr("guest")
    celery_queue: str = "pricer"
    rabbit_url: str = (
        f"pyamqp://{rabbit_user}:{rabbit_password.get_secret_value()}@{rabbit_host}//"
    )

    api_key_genai: str


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
