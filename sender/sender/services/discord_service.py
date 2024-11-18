from typing import Any
import requests
from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from sender.config import settings


class DiscordService:
    def __init__(self):
        self.token = settings.discord_bot_token
        self._setup_template_engine()

    def _setup_template_engine(self):
        template_dir = Path(__file__).parent.parent / "templates"
        self.jinja_env = Environment(
            loader=FileSystemLoader(str(template_dir)), autoescape=True
        )

    def render_template(self, template_name: str, data: dict[str, Any]) -> str:
        template = self.jinja_env.get_template(template_name)
        return template.render(**data)

    def send_message(self, user_id: int, message: str) -> bool:
        url = f"https://discord.com/api/v10/users/@me/channels"
        headers = {
            "Authorization": f"Bot {self.token}",
            "Content-Type": "application/json",
        }

        dm_response = requests.post(
            url, headers=headers, json={"recipient_id": str(user_id)}
        )
        if dm_response.status_code != 200:
            print(f"Błąd tworzenia kanału DM: {dm_response.status_code}")
            return False

        channel_id = dm_response.json()["id"]

        message_url = f"https://discord.com/api/v10/channels/{channel_id}/messages"
        message_response = requests.post(
            message_url, headers=headers, json={"content": message}
        )

        success = message_response.status_code == 200
        if success:
            print("Wiadomość wysłana")
        else:
            print(f"Błąd wysyłania: {message_response.status_code}")
        return success

    def send_apartment_notification(self, user_id: int, data: dict[str, Any]) -> bool:
        message = self.render_template("apartment_notification_discord", data)
        return self.send_message(user_id, message)
