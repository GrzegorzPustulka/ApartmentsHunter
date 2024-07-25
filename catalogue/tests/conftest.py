from catalogue.main import app
from pymongo import MongoClient
import pytest
from fastapi.testclient import TestClient
from catalogue.db import get_db


@pytest.fixture(scope="session")
def mongo_client():
    client = MongoClient("mongodb://localhost:27017")
    yield client
    client.close()


@pytest.fixture(scope="function")
def test_db(mongo_client):
    db = mongo_client["testdatabase"]
    yield db
    mongo_client.drop_database("testdatabase")


@pytest.fixture(scope="function")
def client(test_db):
    def override_get_db():
        yield test_db

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="function")
def test_data(test_db):
    items = [
        {
            "_id": "66a1721e905830caa1ddb43e",
            "title": "wynajem prywatnie 2 pokoje mieszkanie Prądnik Czerwony Kraków",
            "link": "https://www.olx.pl/d/oferta/wynajem-prywatnie-2-pokoje-mieszkanie-pradnik-czerwony-krakow-CID3-IDYyr2v.html",
            "city": "krakow",
            "district": "Prądnik Czerwony",
            "date": "Dzisiaj o 21:06",
            "area": 10,
            "building_type": "Blok",
            "number_of_rooms": "2 pokoje",
            "floor_level": "2",
            "is_furnished": False,
            "is_private_offer": True,
            "price": 1000,
            "media": {
                "current": "wg zużycia",
                "gas": "brak informacji",
                "heating": "w cenie czynszu",
                "water": "w cenie czynszu",
            },
            "internet": "we własnym zakresie",
            "rubbish": "w cenie czynszu",
        },
        {
            "_id": "66a1721f905830caa1ddb43f",
            "title": "Szuwarowa , mieszkanie 3 pokojowe do wynajęcia.",
            "link": "https://www.olx.pl/d/oferta/szuwarowa-mieszkanie-3-pokojowe-do-wynajec...",
            "city": "krakow",
            "district": "Dębniki",
            "date": "Dzisiaj o 20:58",
            "area": 20,
            "building_type": "Blok",
            "number_of_rooms": "3 pokoje",
            "floor_level": "Parter",
            "is_furnished": False,
            "is_private_offer": False,
            "price": 2000,
            "media": {
                "current": "wg zużycia",
                "gas": "w cenie czynszu",
                "heating": "w cenie czynszu",
                "water": "w cenie czynszu",
            },
            "internet": "brak informacji",
            "rubbish": "w cenie czynszu",
        },
        {
            "_id": "66a17220905830caa1ddb440",
            "title": "Idealne dla pary blisko Nowego Kleparza ul. Oboźna",
            "link": "https://www.olx.pl/d/oferta/idealne-dla-pary-blisko-nowego-kleparza-ul...",
            "city": "krakow",
            "district": "Krowodrza",
            "date": "Dzisiaj o 20:57",
            "area": 30,
            "building_type": "Apartamentowiec",
            "number_of_rooms": "Kawalerka",
            "floor_level": "Parter",
            "is_furnished": False,
            "is_private_offer": False,
            "price": 3000,
            "media": {
                "current": "wg zużycia",
                "gas": "brak informacji",
                "heating": "w cenie czynszu",
                "water": "w cenie czynszu",
            },
            "internet": "we własnym zakresie",
            "rubbish": "w cenie czynszu",
        },
        {
            "_id": "66a17220905830caa1ddb441",
            "title": "Renovated studio - kawalerka Kraków super lokalizacja",
            "link": "https://www.olx.pl/d/oferta/renovated-studio-kawalerka-krakow-super-lo...",
            "city": "krakow",
            "district": "Grzegórzki",
            "date": "Dzisiaj o 20:44",
            "area": 40,
            "building_type": "Blok",
            "number_of_rooms": "Kawalerka",
            "floor_level": "8",
            "is_furnished": False,
            "is_private_offer": True,
            "price": 4000,
            "media": {
                "current": "wg zużycia",
                "gas": "wg zużycia",
                "heating": "w cenie czynszu",
                "water": "w cenie czynszu",
            },
            "internet": "we własnym zakresie",
            "rubbish": "w cenie czynszu",
        },
    ]
    test_db.krakow.insert_many(items)
    yield items
    test_db.krakow.delete_many({})
