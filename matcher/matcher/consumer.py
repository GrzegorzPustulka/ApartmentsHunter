from pymongo import MongoClient
from typing import Any
from pymongo import MongoClient, database
from matcher.config import settings
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
import time


class MongoStreamConsumer:
    def __init__(self) -> None:
        self.client: MongoClient = None
        self.db: database.Database = None

        while self.client is None:
            try:
                self.client = MongoClient(settings.mongo_uri)
                self.db = self.client[settings.mongo_name]

                self.client.admin.command("ping")
            except (ConnectionFailure, ServerSelectionTimeoutError) as e:
                print(f"MongoDB connection failed, retrying in 5 seconds...")
                time.sleep(5)

    def watch_inserts(self) -> None:
        with self.db.watch([{"$match": {"operationType": "insert"}}]) as stream:
            for change in stream:
                self.process_change(change)

    @staticmethod
    def process_change(change: dict[str, Any]) -> None:
        full_document = change.get("fullDocument")
        print(full_document)
