from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    mongo_name: str = "catalogue"
    mongo_port: int = 27017
    mongo_host: str = "localhost"
    mongo_uri: str = f"mongodb://{mongo_host}:{mongo_port}/{mongo_name}"


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
