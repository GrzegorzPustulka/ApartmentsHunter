from pydantic_settings import BaseSettings
from pydantic import SecretStr, PostgresDsn
from functools import lru_cache
import secrets


class Settings(BaseSettings):
    # DATABASE
    db_user: str = "postgres"
    db_password: SecretStr = SecretStr("SecretPassword")
    db_host: str = "postgres"
    db_port: int = 5432
    db_name: str = "database"

    # SECURITY
    access_token_expire_minutes: int = 60 * 24 * 8  # 8 days
    algorithm: str = "HS256"
    secret_key: str = secrets.token_urlsafe(32)
    email_reset_token_expire_minutes: int = 60 * 24  # 1 day
    frontend_url: str = "http://localhost:3000"

    # Redis
    redis_host: str = "redis"
    redis_port: int = 6379
    redis_db: int = 0

    # RabbitMQ
    rabbit_host: str = "rabbitmq"
    rabbit_user: str = "guest"
    rabbit_password: SecretStr = SecretStr("guest")
    rabbit_url: str = (
        f"pyamqp://{rabbit_user}:{rabbit_password.get_secret_value()}@{rabbit_host}//"
    )

    @property
    def sqlalchemy_database_uri(self) -> PostgresDsn:
        return f"postgresql://{self.db_user}:{self.db_password.get_secret_value()}@{self.db_host}:{self.db_port}/{self.db_name}"


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
