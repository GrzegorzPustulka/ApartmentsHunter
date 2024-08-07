from typing import Any

from bson import ObjectId

from writer.db import MongoDBClient
from writer.config import settings


class OfferRepositoryCache:
    _cache = {}

    @classmethod
    def get_repository(cls, city: str):
        if city not in cls._cache:
            cls._cache[city] = OfferRepository(city)
        return cls._cache[city]


class OfferRepository:
    def __init__(self, city: str):
        self.collection = MongoDBClient.get_database(settings.mongo_name)[city]

    def add_offer(self, offer: dict[str, Any]) -> dict[str, Any]:
        result = self.collection.insert_one(offer)
        return result.inserted_id

    def get_offer(self, offer_id: ObjectId) -> dict[str, Any]:
        return self.collection.find_one({"_id": ObjectId(offer_id)})

    def get_all_offers(self):
        return list(self.collection.find())

    def update_offer(self, offer_id: ObjectId, offer: dict[str, Any]) -> dict[str, Any]:
        result = self.collection.update_one(
            {"_id": ObjectId(offer_id)}, {"$set": offer}
        )
        return result.modified_count

    def delete_offer(self, offer_id: ObjectId) -> dict[str, Any]:
        result = self.collection.delete_one({"_id": ObjectId(offer_id)})
        return result.deleted_count
