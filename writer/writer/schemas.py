from pydantic import BaseModel


class Media(BaseModel):
    current: int | float | str
    gas: int | float | str
    heating: int | float | str
    water: int | float | str


class CreateOffer(BaseModel):
    # from Hunter
    title: str
    link: str
    city: str | None = None
    district: str | None = None
    date: str | None = None
    size: float | None = None

    # from Pricer
    rent: float
    administrative_rent: float | None = None
    media: Media
    internet: float | str
    rubbish: float | str
