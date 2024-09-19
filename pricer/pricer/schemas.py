from pydantic import BaseModel


class PricerSchema(BaseModel):
    rent: int | float
    administrative_rent: int | float | None = None
    deposit: int | float | str
    standard: str
    bedrooms: str
