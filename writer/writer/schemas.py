from pydantic import BaseModel, ConfigDict


class Media(BaseModel):
    current: int | float | str
    gas: int | float | str
    heating: int | float | str
    water: int | float | str


class CreateOffer(BaseModel):
    model_config = ConfigDict(extra="allow")
    # from Hunter
    title: str
    link: str
    city: str | None = None
    district: str | None = None
    date: str | None = None
    area: float | None = None

    # from Pricer
    price: float
    media: Media
    internet: float | str
    rubbish: float | str
