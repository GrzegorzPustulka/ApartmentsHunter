from matcher.consumer import MongoStreamConsumer


if __name__ == "__main__":
    consumer = MongoStreamConsumer()
    consumer.watch_inserts()
