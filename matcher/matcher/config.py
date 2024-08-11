from pydantic_settings import BaseSettings
from pydantic import SecretStr, PostgresDsn
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

    # DATABASE
    db_user: str = "postgres"
    db_password: SecretStr = SecretStr("SecretPassword")
    db_host: str = "postgres"
    db_port: int = 5432
    db_name: str = "database"

    @property
    def sqlalchemy_database_uri(self) -> PostgresDsn:
        return f"postgresql://{self.db_user}:{self.db_password.get_secret_value()}@{self.db_host}:{self.db_port}/{self.db_name}"


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
