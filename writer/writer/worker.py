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

    send_to_sender(apartment.as_dict())


def handle_keep_alive(conn, cursor, last_keep_alive):
    if time.time() - last_keep_alive > 300:
        try:
            cursor.execute("SELECT 1")
            conn.commit()
            return time.time()
        except (psycopg2.OperationalError, psycopg2.InterfaceError):
            raise psycopg2.OperationalError("Keep-alive failed")
    return last_keep_alive


def listen_notifications() -> None:
    conn = engine.raw_connection()
    conn.set_isolation_level(0)
    cursor = conn.cursor()
    cursor.execute("LISTEN apartments_channel;")

    last_keep_alive = time.time()

    try:
        while True:
            if not select.select([conn], [], [], 5) == ([], [], []):
                conn.poll()
                while conn.notifies:
                    process_notification(conn.notifies.pop(0))

            last_keep_alive = handle_keep_alive(conn, cursor, last_keep_alive)

    except (psycopg2.OperationalError, psycopg2.InterfaceError):
        cursor.close()
        conn.close()
        listen_notifications()
    finally:
        cursor.close()
        conn.close()
