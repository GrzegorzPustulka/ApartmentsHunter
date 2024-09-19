from bson import ObjectId
from pydantic import BaseModel, Field, model_validator, field_validator
from catalogue.resources.districts import get_district
from catalogue.resources.cities import get_city
from typing import Literal


BuildingType = Literal[
    "Blok",
    "Kamienica",
    "Dom wolnostojący",
    "Szeregowiec",
    "Apartamentowiec",
    "Loft",
    "Pozostałe",
]
NumberOfRooms = Literal["1 pokój", "2 pokoje", "3 pokoje", "4 i więcej"]
NumberOfBedrooms = Literal["1 sypialnia, 2 sypialnie", "3 sypialnie", "4 i więcej"]
Standard = Literal["niski", "normalny", "wysoki"]


class ApartmentParams(BaseModel):
    city: str
    district: list[str] | None = None

    minimum_price: int | None = None
    maximum_price: int | None = None
    minimum_area: int | None = None
    maximum_area: int | None = None
    deposit: int | None = None

    building_type: list[BuildingType] | None = None
    number_of_rooms: list[NumberOfRooms] | None = None
    is_furnished: bool | None = None
    is_private_offer: bool | None = None

    bedrooms: list[NumberOfBedrooms] | None = None
    standard: list[Standard] | None = None

    @model_validator(mode="after")
    def validate_params(self) -> "ApartmentParams":
        self.validate_area()
        self.validate_price()
        self.validate_district()
        return self

    def validate_area(self):
        if (
            self.maximum_area
            and self.minimum_area
            and self.minimum_area > self.maximum_area
        ):
            raise ValueError("Minimum area must be less than maximum area")

    def validate_price(self):
        if (
            self.maximum_price
            and self.minimum_price
            and self.minimum_price > self.maximum_price
        ):
            raise ValueError("Maximum price must be less than minimum price")

    def validate_district(self):
        if self.district and self.city:
            city = get_city(self.city)
            for district in self.district:
                if district not in get_district(city):
                    raise ValueError(f"{district} is not supported for {self.city}.")


class ApartmentRead(BaseModel):
    id: str = Field(None, alias="_id")
    title: str
    link: str
    city: str
    district: str
    area: int | float
    price: int | float
    building_type: str
    number_of_rooms: str
    is_furnished: bool
    is_private_offer: bool

    @field_validator("id", mode="before")
    @classmethod
    def deserialize_objectid(cls, v: ObjectId) -> str:
        return str(v)
