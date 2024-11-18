from typing import Any
import requests
from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from sender.config import settings


class TelegramService:
    def __init__(self):
        self.token = settings.telegram_bot_token
        self.api_url = f"https://api.telegram.org/bot{self.token}"
        self._setup_template_engine()

    def _setup_template_engine(self):
        template_dir = Path(__file__).parent.parent / "templates"
        self.jinja_env = Environment(
            loader=FileSystemLoader(str(template_dir)), autoescape=True
        )

    def render_template(self, template_name: str, data: dict[str, Any]) -> str:
        template = self.jinja_env.get_template(template_name)
        return template.render(**data)

    def send_message(self, chat_id: int, message: str) -> bool:
        url = f"{self.api_url}/sendMessage"
        data = {"chat_id": chat_id, "text": message, "parse_mode": "HTML"}

        response = requests.post(url, json=data)
        success = response.status_code == 200
        if success:
            print("Wiadomość wysłana")
        else:
            print(f"Błąd wysyłania: {response.status_code}")
        return success

    def send_apartment_notification(self, chat_id: int, data: dict[str, Any]) -> bool:
        message = self.render_template("apartment_notification_discord", data)
        return self.send_message(chat_id, message)
