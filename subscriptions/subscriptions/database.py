from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from subscriptions.config import settings

engine = create_engine(settings.sqlalchemy_database_uri)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)
