from pymongo import MongoClient
from pymongo.database import Database
from typing import Generator
from catalogue.config import settings


class MongoDB:
    def __init__(self) -> None:
        self.client = MongoClient(settings.mongo_uri)
        self.db = self.client[settings.mongo_name]

    def get_database(self) -> Database:
        return self.db


mongo_db = MongoDB()


def get_db() -> Generator[Database, None, None]:
    db = mongo_db.get_database()
    try:
        yield db
    finally:
        pass
