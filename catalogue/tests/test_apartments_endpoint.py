import pytest


@pytest.mark.parametrize(
    "json, key",
    [
        ({"district": ["Prądnik Czerwony", "Krowodrza"]}, "district"),
        # TODO: add more tests
    ],
)
def test_query_with_list(client, test_data, json, key):
    json["city"] = "krakow"
    response = client.post("/api/v1/apartments", json=json)
    for f in response.json():
        assert f[key] in json[key]


def test_query_with_only_city(client, test_data):
    json = {"city": "krakow"}
    response = client.post("/api/v1/apartments", json=json)
    assert len(response.json()) == len(test_data)


def test_query_with_min_and_max_price(client, test_data):
    json = {"minimum_price": 2000, "maximum_price": 3000, "city": "krakow"}
    response = client.post("/api/v1/apartments", json=json)
    for f in response.json():
        assert 2000 <= f["price"] <= 3000


def test_query_with_min_and_max_are(client, test_data):
    json = {"minimum_area": 0, "maximum_area": 20, "city": "krakow"}
    response = client.post("/api/v1/apartments", json=json)
    for f in response.json():
        assert 0 <= f["area"] <= 30
