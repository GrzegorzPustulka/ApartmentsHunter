GET_DISTRICT = {
    "krakow": [
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
    "warszawa": [],
    "poznan": [],
}


def get_district(district: str) -> str:
    return GET_DISTRICT.get(district, district)
