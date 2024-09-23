from writer.tasks.tasks import send_to_sender


def receive_after_insert(mapper, connection, target):
    print(f"Record added: {target}")

    # with SessionLocal() as session:
    #     # subscriptions = subscription_repository.get_all(session)
    #     # active_subscriptions = [sub for sub in subscriptions if sub.status == "active"]
    #     # if not active_subscriptions:
    #     #     return
    #
    #     # for sub in active_subscriptions:
    #     #     params = ApartmentParams(**sub.as_dict())
    #     #     query = build_query(params)
    #     #
    #     #     if matches_query(record, query):
    #     #         print("ITS WORKS")
    #     # WYSYLAMY TUTAJ
    #     # data = {
    #     #     "notification_destination": "email",
    #     #     "user_email": "example@gmail.com",
    #     # }
    send_to_sender("example@gmail.com", target.as_dict())
