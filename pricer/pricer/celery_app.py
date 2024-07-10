from celery import Celery
from kombu import Exchange, Queue
import google.generativeai as genai
from pricer.config import settings


celery_app = Celery(
    "pricer",
    broker=settings.rabbit_url,
    backend="redis://localhost",
    include=["pricer.tasks"],
)

default_exchange = Exchange("default", type="direct")

celery_app.conf.task_queues = (
    Queue("default", default_exchange, routing_key="default"),
    Queue("pricer_queue", default_exchange, routing_key="pricer_queue"),
)

celery_app.conf.task_default_queue = "default"
celery_app.conf.task_default_exchange = "default"
celery_app.conf.task_default_routing_key = "default"

celery_app.conf.task_routes = {
    "process_offer_in_pricer": {"queue": "pricer_queue"},
}

genai.configure(api_key=settings.api_key_genai)
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config={"response_mime_type": "application/json"},
)
