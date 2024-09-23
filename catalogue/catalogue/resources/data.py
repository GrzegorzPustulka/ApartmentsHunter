GET_DISTRICT = {
    "Kraków": [
        "Bieńczyce",
        "Bieżanów-Prokocim",
        "Bronowice",
        "Czyżyny",
        "Dębniki",
        "Grzegórzki",
        "Krowodrza",
        "Łagiewniki-Borek Fałęcki",
        "Mistrzejowice",
        "Nowa Huta",
        "Podgórze",
        "Podgórze Duchackie",
        "Prądnik Biały",
        "Prądnik Czerwony",
        "Stare Miasto",
        "Swoszowice",
        "Wzgórza Krzesławickie",
        "Zwierzyniec",
    ],
    "Warszawa": [],
    "Poznań": [],
}


def get_city() -> list[str]:
    return list(GET_DISTRICT.keys())


def get_district(city: str) -> str | None:
    return GET_DISTRICT.get(city, None)
