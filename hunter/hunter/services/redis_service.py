import redis
from hunter.config import settings


class RedisService:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(RedisService, cls).__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self):
        self.client = redis.StrictRedis(
            host=settings.redis_host,
            port=settings.redis_port,
            db=settings.redis_db,
            decode_responses=True,
        )

    def add_offer(self, city: str, link: str) -> None:
        self.client.lpush(self._create_key(city), link)

    def get_offers(self, city: str) -> list[str]:
        return self.client.lrange(self._create_key(city), 0, -1)

    def offer_exists(self, city: str, link: str) -> bool:
        return link in self.get_offers(city)

    def remove_offer(self, city) -> None:
        self.client.ltrim(self._create_key(city), 0, settings.redis_offer_limit - 1)

    @staticmethod
    def _create_key(city: str):
        return f"offers:{city}"
