from bs4 import BeautifulSoup
from bs4.element import ResultSet, Tag
from hunter.schemas import Offer
import requests
from hunter.config import settings
import logging

log = logging.getLogger(__name__)


class OfferScraperService:
    def __init__(self, city: str):
        self.city = city
        self.url = f"{settings.olx_base_url}/{city}/"

    def scrape_latest_offers(self) -> list[Offer]:
        listings = self._get_listings()

        apartments = []
        for index, listing in enumerate(listings):
            if settings.offer_offset < index < settings.offer_limit:
                try:
                    district, date = self._get_location_and_date(listing)
                    apartment = Offer(
                        title=self._get_title(listing),
                        link=self._get_url(listing),
                        price=self._get_price(listing),
                        size=self._get_size(listing),
                        city=self.city,
                        district=district,
                        date=date,
                    )
                    apartments.append(apartment)
                except (ValueError, TypeError):
                    continue
        return apartments

    def _get_listings(self) -> ResultSet:
        response = requests.get(self.url)
        soup = BeautifulSoup(response.content, "html.parser")
        return soup.find_all("div", class_="css-1apmciz")

    @staticmethod
    def _get_title(listing: Tag) -> str:
        title_tag = listing.find("a", class_="css-z3gu2d")
        return title_tag.text if title_tag else ""

    @staticmethod
    def _get_url(listing: Tag) -> str:
        title_tag = listing.find("a", class_="css-z3gu2d")
        prefix = "" if "www.otodom.pl" in title_tag["href"] else "https://www.olx.pl"
        return prefix + title_tag["href"] if title_tag else ""

    @staticmethod
    def _get_location_and_date(listing: Tag) -> tuple[str, str]:
        location_and_date_tag = listing.find("p", class_="css-1mwdrlh")
        value = location_and_date_tag.text if location_and_date_tag else ""

        if "Odświeżono" in value:
            log.debug("We are not interested in refreshed offers")
            raise ValueError("We are not interested in refreshed offers")
        try:
            values = value.split(",")
            district = values[1].split(" - ")[0].strip()
            date = values[1].split(" - ")[1].strip()
        except IndexError:
            district = "unknown"
            date = value.split(" - ")[1].strip()
        return district, date

    @staticmethod
    def _get_price(listing: Tag) -> str:
        price_tag = listing.find("p", class_="css-13afqrm")
        return price_tag.text if price_tag else ""

    @staticmethod
    def _get_size(listing: Tag) -> str:
        size_tag = listing.find("span", class_="css-643j0o")
        return size_tag.text if size_tag else ""
