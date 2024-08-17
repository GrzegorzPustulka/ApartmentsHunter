prompt_price_olx = """
Proszę podaj na podstawie danych: czynsz, czynsz administracyjny, kaucję, standard mieszkania, ilość sypialni.
Zasady jakie wartości mogą mieć pola, nie dodawaj żadnych swoich informacji, trzymaj się zasad:
- rent: dozwolone wartości: [kwota]
- administrative_rent: dozwolone wartości: [kwota]
- deposit: dozwolone wartości: [kwota, brak informacji, brak kaucji]
    jeśli nie ma podanego w ogłoszeniu zwróc deposit: None
- standard: dozwolone wartości: [niski, normalny, wyższy]
    Sugeruj się tylko zdjęciami.
    Nie bój dawać się standardu niski, kiedy widac ze te meble są brzydkie lub przestarzale.
    Rowniez kiedy zastanawiasz się czy jest to juz standard wysoki to nnie bój dawać się poziomu wysoki.
  - niski:
    - podłoga: w przeciętnym stanie, zazwyczaj jakies staromodne powierzchnie
    - meble: stare, brzydkie, przestarzałe na obecne czasy
    - łazienka: starsze urządzenia, słaby wystrój, starsze urzadzenia
    - kuchnia: stara, przestarzałe meble
    - ściany: mogą wymagać malowania, stare tapety lub farby
  - normalny:
    - podłoga: w dobrym stanie, nie wymaga natychmiastowej renowacji
    - meble: nie są najnowsze, ale nie są brzydkie, brak widocznych uszkodzeń
    - łazienka: w dobrym stanie, standardowe urządzenia, czyste i funkcjonalne
    - kuchnia: w dobrym stanie, standardowe urządzenia, mogą być starsze, ale funkcjonalne
    - ściany: w dobrym stanie, pomalowane, brak widocznych uszkodzeń
  - wysoki:
    - wyposażenie: nowoczesne, wysokiej jakości
    - podłoga: w bardzo dobrym stanie, często nowe lub odnowione
    - meble: w bardzo ładnym stanie, nowoczesne, stylowe
    - łazienka: nowoczesne urządzenia, ładne wykończenia, dodatkowe udogodnienia jak podgrzewana podłoga
    - kuchnia: nowoczesne meble i urządzenia, często wyposażona w zmywarkę, nowoczesny design
    - ściany: świeżo pomalowane, nowoczesne kolory, brak jakichkolwiek uszkodzeń
- bedrooms: dozwolone wartości: [liczba]
    ilość sypialni staraj się wyciągać na podstawie opisu, ponieważ na zdjęciach cięzko to ocenic.
    sypialnia to jest nieprzechodni pokój. wiec salon, salon z aneksem kuchennym to nie jest sypialnia.
- liczby podawaj jako int lub float

Przykład:
{
    "rent": 3500,
    "administrative_rent": 550,
    "deposit": 3500,
    "standard": "wyższy",
    "bedrooms": 3
}
"""
