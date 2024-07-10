prompt_price_olx = """
Proszę podać dane cenowe, czyli: czynsz, czynsz administracyjny, media itp w formacie z przykładu.
Zasady jakie wartości mogą mieć pola, nie dodawaj żadnych swoich informacji trzymaj się zasad:
- rent: dozwolone wartości: [kwota]
- administrative_rent: dozwolone wartości [kwota]
- current: dozwolone wartości: [wg zuzycia | brak informacji | w cenie czynszu | kwota]
- gas: dozwolone wartości: [wg zuzycia | brak informacji | w cenie czynszu | brak gazu | kwota]
- heating: dozwolone wartości: [wg zuzycia | w cenie czynszu | kwota]
- water: dozwolone wartości: [wg zuzycia | w cenie czynszu | kwota]
- internet: dozwolone wartości: [brak informacji | we wlasnym zakresie | w cenie czynszu | kwota]
- rubbish: dozwolone wartości: [brak informacji | w cenie czynszu | kwota]
- jeśli nie ma informacji o water lub heating napisz w cenie czynszu 
- kwoty podawaj jako int lub float
przykład:
{
    "rent": 3500,
    "administrative_rent": 550,
    "media": {
        "current": wg zuzycia
        "gas": brak gazu
        "heating": w cenie czynszu 
        "water": w cenie czynszu 
    },
    "internet": brak informacji
    "rubbish": w cenie czynszu 
}
"""
