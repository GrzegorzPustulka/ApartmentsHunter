```bash
docker run --name redis-container -p 6379:6379 -d redis:alpine
```
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```
```bash
celery -A hunter.celery_app worker --loglevel=info
```
```bash
celery -A hunter.celery_app beat --loglevel=info
```