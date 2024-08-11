from typing import Any
from pymongo import MongoClient
from matcher.config import settings
from subscriptions.repository.subscription import (
    subscription as subscription_repository,
)
from matcher.database import SessionLocal


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
        session = SessionLocal()
        subs = subscription_repository.get_all(session)

        if not subs:
            return

        for sub in subs:
            print(sub)

        session.close()
