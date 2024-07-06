prompt_price_olx = """
roszę podać szczegółowe dane cenowe, tj. czynsz, czynsz administracyjny, media itp w dokladnym formacie z przykladu

zasady:
- nie podawaj kaucji
- jeśli nie ma informacji o ogrzewaniu i wodze to sa wliczone w czynsz administracyjny

przykład:
{
    "czynsz": 3500,
    "czynsz_administracyjny": 550,
    "media": {
        "prąd": {
            "cena": "wg zużycia",
            "szacunkowy_koszt": 100
        }
        "gaz": {
            "cena": "brak informacji",
            "szacunkowy_koszt": null
        }
        "ogrzewanie": {
            "cena": "w cenie czynszu administracyjnego",
            "szacunkowy_koszt": 100
        }
        "woda": {
            "cena": "w cenie czynszu administracyjnego",
            "szacunkowy_koszt": 100
        }
    },
    "inne": {
        "internet": {
            "cena": "we wlasnym zakresie",
            "koszt": null
        }
        "śmieci": {
            "cena": "brak informacji",
            "koszt": null
        }
        "tv": {
            "cena": "brak informacji",
            "koszt": null
        }
    }
}
"""
