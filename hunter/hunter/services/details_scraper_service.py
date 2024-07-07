import requests
from bs4 import BeautifulSoup
from hunter.schemas import DetailsOffer


class DetailsScraperService:
    def __init__(self, url: str):
        self.url = url
        response = requests.get(self.url)
        self.soup = BeautifulSoup(response.content, "html.parser")

    def scrape_offer_details(self) -> DetailsOffer | None:
        try:
            return DetailsOffer(
                rent=self._get_administrative_rent(),
                images_url=self._get_images_url(),
                description=self._get_description(),
            )
        except (ValueError, TypeError):
            return

    def _get_description(self) -> str:
        description_div = self.soup.find("div", class_="css-1t507yq")
        return description_div.get_text(strip=True) if description_div else ""

    def _get_images_url(self) -> list[str]:
        photos_tag = self.soup.find_all("img", class_="css-1bmvjcs")
        return [tag["src"] for tag in photos_tag]

    def _get_administrative_rent(self) -> str:
        tags = self.soup.find_all("li", class_="css-1r0si1e")
        return next((tag.text for tag in tags if "Czynsz" in tag.text), "")
