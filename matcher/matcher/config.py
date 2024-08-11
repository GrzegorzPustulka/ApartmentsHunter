from pydantic_settings import BaseSettings
from pydantic import SecretStr
from functools import lru_cache


class Settings(BaseSettings):
    # mongo
    mongo_name: str = "catalogue"
    mongo_port: int = 27017
    mongo_host: str = "mongo"
    mongo_uri: str = f"mongodb://{mongo_host}:{mongo_port}/{mongo_name}"

    # Redis
    redis_host: str = "redis"
    redis_port: int = 6379
    redis_db: int = 0
    redis_offer_limit: int = 15

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
