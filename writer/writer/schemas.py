from pydantic import BaseModel, ConfigDict


class Media(BaseModel):
    current: int | float | str
    gas: int | float | str
    heating: int | float | str
    water: int | float | str


class CreateOffer(BaseModel):
    # from Hunter
    title: str
    link: str
    city: str
    district: str
    date: str
    area: float
    building_type: str
    number_of_rooms: str
    floor_level: str | None = None
    is_furnished: bool
    is_private_offer: bool

    # from Pricer
    price: float
    media: Media
    internet: float | str
    rubbish: float | str
