from pydantic import BaseModel, Field, model_validator
from typing import Literal, TypeAlias
from typing_extensions import Self

DevelopmentType: TypeAlias = Literal[
    "all",
    "block",
    "tenement",
    "detached house",
    "terraced house",
    "apartment building",
    "loft",
    "other",
]


class SubscriptionCreate(BaseModel):
    website: Literal["olx"] = "olx"
    city: Literal["Krakow"] = "Krakow"
    category: Literal["apartments"] = "apartments"
    subcategory: Literal["rental"] = "rental"
    development_type: DevelopmentType = "all"
    room_count: list[int] | Literal["all"] = "all"
    minimum_price: int = Field(0, ge=0)
    maximum_price: int = Field(1_000_000, ge=0)
    minimum_area: int = Field(0, ge=0)
    maximum_area: int = Field(1_000_000, ge=0)
    floor_level: list[int] | Literal["all"] = "all"
    furnishing: Literal["all"] | bool = "all"

    @model_validator(mode="after")
    def validate_price_and_area(self) -> Self:
        if self.minimum_area > self.maximum_area:
            raise ValueError("Minimum area must be less than maximum area")

        if self.minimum_price > self.maximum_price:
            raise ValueError("Maximum price must be less than minimum area")

        return self


class SubscriptionRead(BaseModel):
    website: Literal["olx"]
    city: Literal["Krakow"]
    category: Literal["apartments"]
    subcategory: Literal["rental"]
    development_type: DevelopmentType
    room_count: list[int] | Literal["all"]
    minimum_price: int
    maximum_price: int
    minimum_area: int
    maximum_area: int
    floor_level: list[int] | Literal["all"]
    furnishing: Literal["all"] | bool


class SubscriptionUpdate(BaseModel):
    pass
