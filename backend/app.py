from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import time

while True:
    try:
        db_connection = psycopg2.connect(
            host="db",
            database="mydb",
            user="myuser",
            password="mypassword"
        )

        print("Connected to database")
        break

    except psycopg2.OperationalError:
        print("Waiting for database connection..")
        time.sleep(2)


app = Flask(__name__)
CORS(app)


@app.route("/api")
def hello():
    cursor = db_connection.cursor()
    cursor.execute("SELECT 'Hello from PostgreSQL!' ")
    result = cursor.fetchone()
    return jsonify({"message": result[0]})


@app.route("/get_users")
def get_users():
    cursor = db_connection.cursor()
    cursor.execute("SELECT id, username FROM users")
    
    results = cursor.fetchall()

    if len(results) == 0:
        return jsonify({"users": []})
    

    output = []

    for result in results:
        output.append({
            "id": result[0],
            "username": result[1]
        })

    return jsonify({"users": output})

@app.route("/add_user", methods=["POST"])
def add_user():
    data = request.get_json()
    username = data.get("username")

    cursor = db_connection.cursor()
    cursor.execute(
        "INSERT INTO users(username) VALUES (%s)",
        (username,)
    )

    db_connection.commit()

    return jsonify({"message": "User added!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5050)