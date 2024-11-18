from sender.services.discord_service import DiscordService


def test_discord_notification():
    discord_service = DiscordService()
    user_id = 1234567

    test_data = {
        "title": "Przytulne mieszkanie w centrum",
        "city": "Warszawa",
        "district": "Mokotów",
        "date": "2024-03-20",
        "price": "3500",
        "deposit": "3500",
        "standard": "Wysoki",
        "area": "45",
        "building_type": "Apartamentowiec",
        "number_of_rooms": "2",
        "bedrooms": "1",
        "is_furnished": True,
        "is_private_offer": False,
        "link": "https://example.com/test-apartment",
    }

    result = discord_service.send_apartment_notification(user_id, test_data)

    if result:
        print("Wiadomość wysłana pomyślnie!")
    else:
        print("Wystąpił błąd podczas wysyłania wiadomości")


if __name__ == "__main__":
    test_discord_notification()
