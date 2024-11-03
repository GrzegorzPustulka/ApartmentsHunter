from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    frontend_url: str = "http://localhost:3000"


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
