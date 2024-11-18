from sender.services.telegram_service import TelegramService


def test_telegram_notification():
    discord_service = TelegramService()
    user_id = 7046853048

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
    test_telegram_notification()
