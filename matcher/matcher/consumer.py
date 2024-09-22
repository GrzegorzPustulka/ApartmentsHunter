from typing import Any
from pymongo import MongoClient
from matcher.config import settings
from subscriptions.repository.subscriptions import (
    subscription as subscription_repository,
)
from subscriptions.database import SessionLocal
from catalogue.schemas.apartment import ApartmentParams
from catalogue.query import build_query
from matcher.utils import matches_query
from matcher.tasks import send_to_sender


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
        record = change.get("fullDocument")

        with SessionLocal() as session:
            # subscriptions = subscription_repository.get_all(session)
            # active_subscriptions = [sub for sub in subscriptions if sub.status == "active"]
            # if not active_subscriptions:
            #     return

            # for sub in active_subscriptions:
            #     params = ApartmentParams(**sub.as_dict())
            #     query = build_query(params)
            #
            #     if matches_query(record, query):
            #         print("ITS WORKS")
            # WYSYLAMY TUTAJ
            data = {
                "notification_destination": "email",
                "user_email": "example@gmail.com",
            }
            del record["_id"]
            send_to_sender("example@gmail.com", record)
