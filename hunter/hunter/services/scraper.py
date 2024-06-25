from bs4 import BeautifulSoup

from hunter.config import settings
import requests


class ScraperService:
    def __init__(self, city: str):
        self.url = f"{settings.olx_base_url}/{city}"

    def scrape_latest_offer(self):
        response = requests.get(self.url)
        soup = BeautifulSoup(response.content, 'html.parser')
        listings = []

        return listings