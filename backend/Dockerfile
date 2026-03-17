FROM python:3.14

WORKDIR /app

COPY . .

RUN pip install flask flask-cors psycopg2-binary

EXPOSE 5050

CMD ["python", "app.py"]