from pydantic import BaseModel


class PricerSchema(BaseModel):
    rent: float
    administrative_rent: float | None = None
    deposit: float | None = None
    standard: str
    bedrooms: str
