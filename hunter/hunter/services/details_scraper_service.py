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
                images_url=self._get_images_url(),
                description=self._get_description(),
                **self._get_tags(),
            )
        except (ValueError, TypeError) as e:
            return

    def _get_description(self) -> str:
        description_div = self.soup.find("div", class_="css-1o924a9")
        return description_div.get_text(strip=True)

    def _get_images_url(self) -> list[str]:
        photos_tag = self.soup.find_all("img", class_="css-1bmvjcs")
        return [tag["src"] for tag in photos_tag]

    def _get_tags(self) -> dict[str, str | bool]:
        details = {
            "building_type": None,
            "number_of_rooms": None,
            "floor_level": None,
            "is_furnished": None,
            "is_private_offer": None,
            "rent": None,
        }

        mapping = {
            "Rodzaj zabudowy": "building_type",
            "Liczba pokoi": "number_of_rooms",
            "Poziom": "floor_level",
            "Umeblowane": "is_furnished",
            "Prywatne": "is_private_offer",
            "Firmowe": "is_private_offer",
            "Czynsz (dodatkowo)": "rent",
        }

        tags = self.soup.find_all("li", class_="css-1r0si1e")
        tag_texts = [tag.text for tag in tags]

        for tag in tag_texts:
            for key, detail_key in mapping.items():
                if key in tag:
                    if detail_key == "is_private_offer":
                        value = True if key == "Prywatne" else False
                    elif detail_key == "is_furnished":
                        value = True if tag == "Umeblowane: Tak" else False
                    else:
                        value = tag.split(": ")[1] if ": " in tag else tag
                    details[detail_key] = value
                    break

        return details
