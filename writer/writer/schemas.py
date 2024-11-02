from pydantic import BaseModel, field_validator


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
    images_url: list[str]
    date: str
    area: float
    building_type: str
    number_of_rooms: str
    is_furnished: bool
    is_private_offer: bool

    @field_validator("city", mode="before")
    @classmethod
    def mapping_city(cls, v: str) -> str:
        cities = {
            "krakow": "Kraków",
            "warszawa": "Warszawa",
            "poznan": "Poznań",
            "wroclaw": "Wrocław",
        }
        return cities.get(v, v)
