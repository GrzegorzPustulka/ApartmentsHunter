from pydantic_settings import BaseSettings
from pydantic import SecretStr, PostgresDsn
from functools import lru_cache


class Settings(BaseSettings):
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
