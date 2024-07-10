from pydantic import BaseModel


class CreateOffer(BaseModel):
    title: str
    link: str
    city: str
    district: str
    date: str
    price: float
    size: float | None = None

