from subscriptions.database import engine
import psycopg2
import select
import time
from uuid import UUID
from writer.tasks.tasks import send_to_sender
from subscriptions.database import SessionLocal
from subscriptions.repository.subscriptions import (
    subscription as subscription_repository,
)
from writer.repositories.apartments import apartment_repository


def process_notification(payload: dict[str, UUID]) -> None:
    id = payload["id"]

    with SessionLocal() as session:
        apartment = apartment_repository.get_by_id(session, id)
        # subscriptions = subscription_repository.get_all(session)
        # active_subscriptions = [sub for sub in subscriptions if sub.status == "active"]
        # if not active_subscriptions:
        #     return

        # for sub in active_subscriptions:
        #     params = ApartmentParams(**sub.as_dict())
        #     query = build_query(params)
        #
        #     if matches_query(record, query):
        #         print("ITS WORKS")
        # WYSYLAMY TUTAJ
        # data = {
        #     "notification_destination": "email",
        #     "user_email": "example@gmail.com",
        # }
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
                    process_notification(notify.payload)
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
