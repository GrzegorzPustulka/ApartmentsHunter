from typing import Any

from sender.config import settings
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


class EmailService:
    def __init__(self, receiver: str):
        self.sender = settings.sender_email
        self.password = settings.smtp_password.get_secret_value()
        self.smtp_server = settings.smtp_server
        self.smtp_port = settings.smtp_port
        self.receiver = receiver

    def send_email(self, data: dict[str, Any]) -> None:
        message = self.create_email_content(data)

        with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
            server.login(self.sender, self.password)
            server.sendmail(self.sender, self.receiver, message.as_string())

    def create_email_content(self, data: dict[str, Any]) -> MIMEMultipart:
        message = MIMEMultipart("alternative")
        message["Subject"] = "ApartmentsHunter - mieszkanie"
        message["From"] = self.sender
        message["To"] = self.receiver

        text = f"""
        Witaj,

        Znaleziono nowe mieszkanie zgodne z Twoimi kryteriami:

        Tytuł: {data.get('title')}
        Lokalizacja: {data.get('city')}, {data.get('district')}
        Data publikacji: {data.get('date')}
        Cena: {data.get('price')} PLN
        Kaucja: {data.get('deposit')}
        Standard: {data.get('standard')}
        Powierzchnia: {data.get('area')} m²
        Typ budynku: {data.get('building_type')}
        Liczba pokoi: {data.get('number_of_rooms')}
        Piętro: {data.get('floor_level', 'Brak danych')}
        Meble: {"Tak" if data.get('is_furnished') else "Nie"}
        Oferta prywatna: {"Tak" if data.get('is_private_offer') else "Nie"}
        Link do ogłoszenia: {data.get('link')}

        Pozdrawiamy,
        ApartmentsHunter
        """

        html = f"""
        <html>
        <body>
            <p>Witaj,</p>
            <p>Znaleziono nowe mieszkanie zgodne z Twoimi kryteriami:</p>
            <ul>
                <li><strong>Tytuł:</strong> {data.get('title')}</li>
                <li><strong>Lokalizacja:</strong> {data.get('city')}, {data.get('district')}</li>
                <li><strong>Data publikacji:</strong> {data.get('date')}</li>
                <li><strong>Cena:</strong> {data.get('price')} PLN</li>
                <li><strong>Kaucja:</strong> {data.get('deposit')}</li>
                <li><strong>Standard:</strong> {data.get('standard')}</li>
                <li><strong>Powierzchnia:</strong> {data.get('area')} m²</li>
                <li><strong>Typ budynku:</strong> {data.get('building_type')}</li>
                <li><strong>Liczba pokoi:</strong> {data.get('number_of_rooms')}</li>
                <li><strong>Piętro:</strong> {data.get('floor_level', 'Brak danych')}</li>
                <li><strong>Meble:</strong> {"Tak" if data.get('is_furnished') else "Nie"}</li>
                <li><strong>Oferta prywatna:</strong> {"Tak" if data.get('is_private_offer') else "Nie"}</li>
                <li><strong>Link do ogłoszenia:</strong> <a href="{data.get('link')}">Kliknij tutaj</a></li>
            </ul>
            <p>Pozdrawiamy,<br> ApartmentsHunter</p>
        </body>
        </html>
        """

        part1 = MIMEText(text, "plain")
        part2 = MIMEText(html, "html")

        message.attach(part1)
        message.attach(part2)

        return message
