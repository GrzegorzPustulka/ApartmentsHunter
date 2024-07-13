from typing import Any

from catalogue.schemas.apartments import ApartmentParams
import inspect


def build_query(params: ApartmentParams) -> dict[str, Any]:
    builder = QueryBuilder(params)
    return builder.build()


class QueryBuilder:
    def __init__(self, params: ApartmentParams):
        self.params = params
        self.query = {}

    def build(self) -> dict[str, Any]:
        for name, method in inspect.getmembers(self, predicate=inspect.ismethod):
            if name.startswith("add_"):
                method()
        return self.query

    def add_price_query(self) -> None:
        price_query = {}
        if self.params.maximum_price:
            price_query["$lte"] = self.params.maximum_price
        if self.params.minimum_price:
            price_query["$gte"] = self.params.minimum_price
        if price_query:
            self.query["price"] = price_query

    def add_area_query(self) -> None:
        if not self.params.unknown_area:
            area_query = {}
            if self.params.maximum_area:
                area_query["$lte"] = self.params.maximum_area
            if self.params.minimum_area:
                area_query["$gte"] = self.params.minimum_area
            if area_query:
                self.query["area"] = area_query

    def add_media(self) -> None:
        media_query = {}
        for field in ["current", "heating", "water", "gas"]:
            value = getattr(self.params, field)
            if value:
                media_query[field] = {"$in": value}
        if media_query:
            self.query["media"] = media_query

    def add_internet_and_rubbish_district_query(self) -> None:
        query = {}
        for field in ["internet", "rubbish", "district"]:
            value = getattr(self.params, field)
            if value:
                query[field] = {"$in": value}
