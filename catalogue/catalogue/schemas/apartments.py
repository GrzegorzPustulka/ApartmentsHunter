from bson import ObjectId
from pydantic import BaseModel, Field, model_validator, field_validator, ConfigDict
from typing import TypeAlias, Literal, Self


Internet: TypeAlias = Literal["brak informacji", "w cenie czynszu", "we wlasnym zakresie", "wszystko"]
Rubbish: TypeAlias = Literal["brak informacji", "w cenie czynszu", "wszystko"]
Current: TypeAlias = Literal["wg zuzycia", "brak informacji", "w cenie czynszu", "wszystko"]
Gas: TypeAlias = Literal["wg zuzycia", "brak informacji", "w cenie czynszu", "brak gazu", "wszystko"]
Heating: TypeAlias = Literal["wg zuzycia", "w cenie czynszu", "wszystko"]
Water: TypeAlias = Literal["wg zuzycia", "w cenie czynszu", "wszystko"]


class ApartmentParams(BaseModel):
    minimum_price: int | None = None
    maximum_price: int | None = None

    minimum_area: int | None = None
    maximum_area: int | None = None
    unknown_area: bool = False
    current: int | float | Current = "wszystko"
    heating: int | float | Heating = "wszystko"
    water: int | float | Water = "wszystko"
    rubbish: int | float | Rubbish = "wszystko"
    gas: int | float | Gas = "wszystko"
    internet: int | float | Internet = "wszystko"
    city: str
    district: str | None = None

    @model_validator(mode="after")
    def validate_price_and_area(self) -> Self:
        if self.maximum_area and self.minimum_area and self.minimum_area > self.maximum_area:
            raise ValueError("Minimum area must be less than maximum area")

        if self.maximum_price and self.maximum_area and self.minimum_price > self.maximum_price:
            raise ValueError("Maximum price must be less than minimum area")

        return self


class Media(BaseModel):
    current: int | float | Current
    heating: int | float | Heating
    water: int | float | Water
    gas: int | float | Gas


class ApartmentRead(BaseModel):
    id: str = Field(None, alias="_id")
    title: str
    link: str
    city: str
    district: str
    size: int | float | None = None
    rent: int | float
    administrative_rent: int | float | None = None
    media: Media
    rubbish: int | float | Rubbish
    internet: int | float | Internet

    @field_validator("id", mode="before")
    @classmethod
    def deserialize_objectid(cls, v: ObjectId) -> str:
        return str(v)

