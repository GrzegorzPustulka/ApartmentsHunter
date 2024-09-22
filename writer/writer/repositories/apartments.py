from subscriptions.models import Apartment
from writer.schemas import ApartmentCreate
from writer.repositories.base import BaseRepository


class ApartmentRepository(BaseRepository[Apartment, ApartmentCreate]):
    pass


apartment_repository = ApartmentRepository(Apartment)
