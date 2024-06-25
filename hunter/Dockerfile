FROM python:3.12-slim

WORKDIR /app

RUN useradd -ms /bin/bash celeryuser

COPY pyproject.toml poetry.lock ./

RUN pip install poetry

RUN poetry config virtualenvs.create false

RUN poetry install --no-root

COPY . .

RUN chown -R celeryuser:celeryuser /app

ENV PYTHONPATH=/app

USER celeryuser

CMD ["celery", "-A", "app.celery_app", "worker", "--loglevel=info"]
