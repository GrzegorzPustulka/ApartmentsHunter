from pydantic import BaseModel


class ApartmentCreate(BaseModel):
    # from Pricer
    price: float
    deposit: float | None = None
    standard: str
    bedrooms: str

    # from Hunter
    title: str
    link: str
    city: str
    district: str
    date: str
    area: float
    building_type: str
    number_of_rooms: str
    is_furnished: bool
    is_private_offer: bool
