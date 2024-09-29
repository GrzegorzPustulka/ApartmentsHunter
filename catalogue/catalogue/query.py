from typing import Literal
from abc import ABC, abstractmethod
from subscriptions.models import Apartment
from sqlalchemy.orm import Session
from sqlalchemy import select


class AbstractQueryBuilder(ABC):
    def __init__(self):
        self.query = None
        self.reset()

    @abstractmethod
    def reset(self):
        pass

    @abstractmethod
    def apply_filters(self, **kwargs):
        pass

    @abstractmethod
    def get_query(self):
        pass


class ApartmentQueryBuilder(AbstractQueryBuilder):
    def reset(self):
        self.query = select(Apartment)

    def apply_filters(self, **kwargs):
        filter_conditions = []

        filter_mappings = {
            "city": lambda value: Apartment.city == value,
            "district": lambda value: Apartment.district.in_(value),
            "minimum_price": lambda value: Apartment.price >= value,
            "maximum_price": lambda value: Apartment.price <= value,
            "deposit": lambda value: Apartment.deposit <= value,
            "building_type": lambda value: Apartment.building_type.in_(value),
            "number_of_rooms": lambda value: Apartment.number_of_rooms.in_(value),
            "is_furnished": lambda value: Apartment.is_furnished == value,
            "is_private_offer": lambda value: Apartment.is_private_offer == value,
            "bedrooms": lambda value: Apartment.bedrooms.in_(value),
            "standard": lambda value: Apartment.standard.in_(value),
        }

        for key, value in kwargs.items():
            if value is not None and key in filter_mappings:
                filter_conditions.append(filter_mappings[key](value))

        if filter_conditions:
            self.query = self.query.where(*filter_conditions)

    def get_query(self):
        built_query = self.query
        self.reset()
        return built_query


class QueryDirector:
    def __init__(self, builder: AbstractQueryBuilder):
        self._builder = builder

    def construct(self, **kwargs):
        self._builder.reset()
        self._builder.apply_filters(**kwargs)
        return self._builder.get_query()


def find_properties(property_type: Literal["apartment", "room"], **filters):
    match property_type:
        case "apartment":
            builder = ApartmentQueryBuilder()
        case "room":
            pass

    director = QueryDirector(builder)
    query = director.construct(**filters)

    return query
