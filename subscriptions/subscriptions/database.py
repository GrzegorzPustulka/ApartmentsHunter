from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker

from subscriptions.core.config import settings
from subscriptions.models import Subscription
from writer.events import receive_after_insert

engine = create_engine(settings.sqlalchemy_database_uri)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)

event.listen(Subscription, "after_insert", receive_after_insert)
