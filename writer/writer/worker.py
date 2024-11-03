from subscriptions.database import engine
import psycopg2
import select
import time
import json
from uuid import UUID
from writer.tasks.tasks import send_to_sender
from subscriptions.database import SessionLocal
from subscriptions.repository.subscriptions import (
    subscription as subscription_repository,
)
from writer.repositories.apartments import apartment_repository
from catalogue.query import find_properties
from catalogue.schemas.apartment import ApartmentParamsBase


def process_notification(notify) -> None:
    id = UUID(notify.payload)

    with SessionLocal() as session:
        apartment = apartment_repository.get_by_id(session, id)

        subscriptions = subscription_repository.get_all(session)
        active_subscriptions = [sub for sub in subscriptions if sub.status == "active"]
        if not active_subscriptions:
            return

        for sub in active_subscriptions:
            query = find_properties("apartment", **sub.as_dict())
            compiled_query = query.compile()
            print(str(compiled_query))

    send_to_sender("example@gmail.com", apartment.as_dict())


def listen_notifications() -> None:
    conn = engine.raw_connection()
    conn.set_isolation_level(0)
    cursor = conn.cursor()
    cursor.execute("LISTEN apartments_channel;")

    try:
        while True:
            if select.select([conn], [], [], 5) == ([], [], []):
                print("No notifications within the last 5 seconds")
            else:
                conn.poll()
                while conn.notifies:
                    notify = conn.notifies.pop(0)
                    process_notification(notify)
    except KeyboardInterrupt:
        pass
    except (psycopg2.OperationalError, psycopg2.InterfaceError):
        print("Lost connection to database, retrying...")
        cursor.close()
        conn.close()
        time.sleep(5)
        listen_notifications()
    finally:
        cursor.close()
        conn.close()
