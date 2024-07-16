from pydantic import BaseModel
from typing import TypeAlias, Literal


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


class Media(BaseModel):
    current: int | float | Current
    gas: int | float | Gas
    heating: int | float | Heating
    water: int | float | Water


class PricerSchema(BaseModel):
    rent: int | float
    administrative_rent: int | float | None = None
    media: Media
    internet: int | float | Internet
    rubbish: int | float | Rubbish
