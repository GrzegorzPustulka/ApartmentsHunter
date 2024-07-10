from pymongo import MongoClient
from writer.config import settings


class MongoDBClient:
    _client = None

    @classmethod
    def get_client(cls):
        if cls._client is None:
            cls._client = MongoClient(settings.mongo_uri)
        return cls._client

    @classmethod
    def get_database(cls, db_name):
        client = cls.get_client()
        return client[db_name]
