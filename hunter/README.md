```bash
docker run --name redis-container -p 6379:6379 -d redis:alpine
```
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```
```bash
docker run --name mongo-container -p 27017:27017 -v $(pwd)/init.js:/docker-entrypoint-initdb.d/init.js -d mongo:latest
```
```bash
celery -A hunter.celery_app worker --loglevel=info
```
```bash
celery -A hunter.celery_app beat --loglevel=info
```
```bash
celery -A pricer.celery_app worker --loglevel=info
```
```bash
celery -A writer.celery_app worker --loglevel=info
```
