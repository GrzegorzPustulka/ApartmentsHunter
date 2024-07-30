from pymongo import MongoClient
from typing import Any
from pymongo import MongoClient, database
from matcher.config import settings
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
import time


class MongoStreamConsumer:
    def __init__(self):
        self.client = MongoClient(settings.mongo_uri)
        self.db = self.client[settings.mongo_name]

    def watch_inserts(self) -> None:
        with self.db.watch([{"$match": {"operationType": "insert"}}]) as stream:
            for change in stream:
                self.process_change(change)

    @staticmethod
    def process_change(change: dict[str, Any]) -> None:
        full_document = change.get("fullDocument")
        print(full_document)
