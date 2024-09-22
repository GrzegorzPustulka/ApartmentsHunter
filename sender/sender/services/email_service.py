from typing import Any, Dict
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
from jinja2 import Environment, FileSystemLoader, select_autoescape
from sender.config import settings


class EmailTemplate:
    APARTMENT_NOTIFICATION = "apartment_notification.html"
    PASSWORD_RESET = "password_reset.html"


class EmailService:
    def __init__(self):
        self.sender = settings.sender_email
        self.smtp_server = settings.smtp_server
        self.smtp_port = settings.smtp_port
        self.jinja_env = Environment(
            loader=FileSystemLoader("sender/templates"),
            autoescape=select_autoescape(["html", "xml"]),
        )

    def send_email(
        self, receiver: str, subject: str, template: str, data: Dict[str, Any]
    ) -> None:
        message = self._create_email_content(receiver, subject, template, data)

        with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
            server.send_message(message)

    def _create_email_content(
        self, receiver: str, subject: str, template: str, data: Dict[str, Any]
    ) -> MIMEMultipart:
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = self.sender
        message["To"] = receiver

        html_template = self.jinja_env.get_template(template)
        html_content = html_template.render(**data)

        text_content = self._html_to_plain_text(html_content)

        part1 = MIMEText(text_content, "plain")
        part2 = MIMEText(html_content, "html")

        message.attach(part1)
        message.attach(part2)

        return message

    def _html_to_plain_text(self, html: str) -> str:
        return (
            html.replace("<br>", "\n")
            .replace("</p>", "\n\n")
            .replace("<li>", "- ")
            .replace("</li>", "\n")
        )


email_service = EmailService()


def send_apartment_notification(receiver: str, data: Dict[str, Any]) -> None:
    email_service.send_email(
        receiver=receiver,
        subject="ApartmentsHunter - Nowe mieszkanie",
        template=EmailTemplate.APARTMENT_NOTIFICATION,
        data=data,
    )


def send_password_reset_email(receiver: str, reset_link: str) -> None:
    email_service.send_email(
        receiver=receiver,
        subject="ApartmentsHunter - Reset hasła",
        template=EmailTemplate.PASSWORD_RESET,
        data={"reset_link": reset_link},
    )
