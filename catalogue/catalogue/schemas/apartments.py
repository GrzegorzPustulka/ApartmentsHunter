from bson import ObjectId
from pydantic import BaseModel, Field, model_validator, field_validator, ValidationInfo
from typing import TypeAlias, Literal, Self, Any


Internet: TypeAlias = Literal[
    "brak informacji", "w cenie czynszu", "we wlasnym zakresie"
]
Rubbish: TypeAlias = Literal["brak informacji", "w cenie czynszu"]
Current: TypeAlias = Literal["wg zuzycia", "brak informacji", "w cenie czynszu"]
Gas: TypeAlias = Literal[
    "wg zuzycia", "brak informacji", "w cenie czynszu", "brak gazu"
]
Heating: TypeAlias = Literal["wg zuzycia", "w cenie czynszu"]
Water: TypeAlias = Literal["wg zuzycia", "w cenie czynszu"]


class ApartmentParams(BaseModel):
    minimum_price: int | None = None
    maximum_price: int | None = None
    minimum_area: int | None = None
    maximum_area: int | None = None
    unknown_area: bool = False

    current: list[str] = Field(default_factory=list)
    heating: list[str] = Field(default_factory=list)
    water: list[str] = Field(default_factory=list)
    rubbish: list[str] = Field(default_factory=list)
    gas: list[str] = Field(default_factory=list)
    internet: list[str] = Field(default_factory=list)

    city: str
    district: list[str] = Field(default_factory=list)

    @field_validator(
        "current", "heating", "water", "rubbish", "gas", "internet", mode="before"
    )
    @classmethod
    def validate_literal(cls, v: Any, info: ValidationInfo) -> list[str] | int | float:
        allowed_values = {
            "current": ["wg zuzycia", "brak informacji", "w cenie czynszu"],
            "heating": ["wg zuzycia", "w cenie czynszu"],
            "water": ["wg zuzycia", "w cenie czynszu"],
            "rubbish": ["brak informacji", "w cenie czynszu"],
            "gas": ["wg zuzycia", "brak informacji", "w cenie czynszu", "brak gazu"],
            "internet": ["brak informacji", "w cenie czynszu", "we wlasnym zakresie"],
        }

        if isinstance(v, list):
            for item in v:
                if item not in allowed_values[info.field_name]:
                    raise ValueError(
                        f"{item} is not a valid value for {info.field_name}. Allowed values are: {allowed_values[info.field_name]}"
                    )

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
    area: int | float | None = None
    rent: int | float
    administrative_rent: int | float | None = None
    media: Media
    rubbish: int | float | Rubbish
    internet: int | float | Internet

    @field_validator("id", mode="before")
    @classmethod
    def deserialize_objectid(cls, v: ObjectId) -> str:
        return str(v)
