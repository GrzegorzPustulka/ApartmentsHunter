from bson import ObjectId
from pydantic import BaseModel, Field, model_validator, field_validator, ValidationInfo
from typing import TypeAlias, Literal, Self, Any


districts = {
    "krakow": [
        "Bieńczyce",
        "Bieżanów-Prokocim",
        "Bronowice",
        "Czyżyny",
        "Dębniki",
        "Grzegórzki",
        "Krowodrza",
        "Łagiewniki-Borek Fałęcki",
        "Mistrzejowice",
        "Nowa Huta",
        "Podgórze",
        "Podgórze Duchackie",
        "Prądnik Biały",
        "Prądnik Czerwony",
        "Stare Miasto",
        "Swoszowice",
        "Wzgórza Krzesławickie",
        "Zwierzyniec",
    ]
}


class ApartmentParams(BaseModel):
    city: str
    district: list[str] | None = None

    minimum_price: int | None = None
    maximum_price: int | None = None
    minimum_area: int | None = None
    maximum_area: int | None = None

    current: list[str] | None = None
    heating: list[str] | None = None
    water: list[str] | None = None
    gas: list[str] | None = None
    rubbish: list[str] | None = None
    internet: list[str] | None = None

    building_type: list[str] | None = None
    number_of_rooms: list[str] | None = None
    floor_level: list[int] | None = None
    is_furnished: bool | None = None
    is_private_offer: bool | None = None

    @field_validator(
        "current",
        "heating",
        "water",
        "rubbish",
        "gas",
        "internet" "building_type",
        mode="before",
    )
    @classmethod
    def validate_fields(cls, v: Any, info: ValidationInfo) -> list[str] | int | float:
        allowed_values = {
            "current": ["wg zuzycia", "brak informacji", "w cenie czynszu"],
            "heating": ["wg zuzycia", "w cenie czynszu"],
            "water": ["wg zuzycia", "w cenie czynszu"],
            "rubbish": ["brak informacji", "w cenie czynszu"],
            "gas": ["wg zuzycia", "brak informacji", "w cenie czynszu", "brak gazu"],
            "internet": ["brak informacji", "w cenie czynszu", "we wlasnym zakresie"],
            "building_type": [
                "Blok",
                "Kamienica",
                "Dom wolnostojący",
                "Szeregowiec",
                "Apartamentowiec",
                "Loft",
                "Pozostałe",
            ],
        }

        if v:
            for item in v:
                if item not in allowed_values[info.field_name]:
                    raise ValueError(
                        f"{item} is not a valid value for {info.field_name}. Allowed values are: {allowed_values[info.field_name]}"
                    )

        return v

    @field_validator("floor_level")
    @classmethod
    def validate_floor_level(cls, v: Any) -> list[str]:
        result = []
        if v:
            for item in v:
                if item == 1:
                    result.append("1 pokój")
                elif item == 2:
                    result.append("2 pokoje")
                elif item == 3:
                    result.append("3 pokoje")
                elif item == 4:
                    result.append("4 i więcej")
                else:
                    raise ValueError(f"Invalid value for floor_level: {item}")
            return result
        return v

    @model_validator(mode="after")
    def validate_price_and_area(self) -> Self:
        if (
            self.maximum_area
            and self.minimum_area
            and self.minimum_area > self.maximum_area
        ):
            raise ValueError("Minimum area must be less than maximum area")

        if (
            self.maximum_price
            and self.maximum_area
            and self.minimum_price > self.maximum_price
        ):
            raise ValueError("Maximum price must be less than minimum area")

        if self.district and self.city:
            for district in self.district:
                if district not in districts[self.city]:
                    raise ValueError(f"District {district} is not supported.")
        return self


class Media(BaseModel):
    current: int | float | str
    heating: int | float | str
    water: int | float | str
    gas: int | float | str


class ApartmentRead(BaseModel):
    id: str = Field(None, alias="_id")
    title: str
    link: str
    city: str
    district: str
    area: int | float
    rent: int | float
    administrative_rent: int | float
    floor_level: str | None = None
    media: Media
    rubbish: int | float | str
    internet: int | float | str
    building_type: str
    number_of_rooms: str
    is_furnished: bool
    is_private_offer: bool

    @field_validator("id", mode="before")
    @classmethod
    def deserialize_objectid(cls, v: ObjectId) -> str:
        return str(v)
