GET_CITY = {
    "Kraków": "krakow",
    "Warszawa": "warszawa",
    "Poznań": "poznan",
    "Wrocław": "wroclaw",
}


def get_city(city: str) -> str:
    return GET_CITY.get(city, city)
