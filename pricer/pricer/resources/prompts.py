prompt_price_olx = """
proszę podać dane cenowe, czyli. czynsz, czynsz administracyjny, media itp w formacie z przykladu

zasady jakie wartosci mogą mieć pola:
- czynsz: kwota lub brak informacji
- czynsz administracyjny: kwota lub brak informacji
- prąd: wg zużycia, brak informacji, w cenie czynszu administracyjnego, kwota
- gaz: wg zuzycia, brak informacji, w cenie czynszu administracyjnego, brak gazu, kwota
- ogrzewanie: wg zużycia, w cenie czynszu administracyjnego, kwota
- woda: wg zużycia, w cenie czynszu administracyjnego, kwota
- internet: brak informacji, we wlasnym zakresie, w cenie czynszu administracyjnego, kwota
- śmieci: brak informacji, w cenie czynszu administracyjnego, kwota
- jesli nie ma informacji o wodzie lub ogrzewaniu napisz w cenie czynszu administracyjnego 
przykład:
{
    "czynsz": 3500,
    "czynsz_administracyjny": 550,
    "media": {
        "prąd": wg zużycia
        "gaz": brak gazu
        "ogrzewanie": w cenie czynszu administracyjnego
        "woda": w cenie czynszu administracyjnego
    },
    "internet": brak informacji
    "śmieci": w cenie czynszu administracyjnego
}
"""
