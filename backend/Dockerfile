FROM python:3.14

WORKDIR /app

COPY . .

RUN pip install flask flask-cors

EXPOSE 5050

CMD ["python", "app.py"]