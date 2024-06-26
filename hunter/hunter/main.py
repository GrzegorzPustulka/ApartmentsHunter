from hunter.services.scraper import ScraperService
from hunter.schemas import Apartment

scraper = ScraperService("Krakow")
offers: list[Apartment] = scraper.scrape_latest_offers()

