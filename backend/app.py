from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import time
from datetime import datetime, timedelta, timezone


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


# @app.route("/api")
# def hello():
#     cursor = db_connection.cursor()
#     cursor.execute("SELECT 'Hello from PostgreSQL!' ")
#     result = cursor.fetchone()
#     return jsonify({"message": result[0]})


@app.route("/get_tasks", methods=["GET"])
def get_tasks():
    cursor = db_connection.cursor()

    cursor.execute(
        """
        SELECT * FROM tasks;
        """
    )

    results = cursor.fetchall()

    if len(results) == 0:
        return jsonify({"message": "database is empty", "users": []})

    output = []

    for result in results:
        output.append({
            "id": result[0],
            "title": result[1],
            "description": result[2],
            "assigned_for": result[3],
            "assigned_by": result[4],
            "status": result[5],
            "created_at": result[6],
            "due_date": result[7]
        })

    return jsonify({"message": "Success", "users": output})


@app.route("/add_task", methods=["POST"])
def add_task():
    now_utc = datetime.now(timezone.utc)

    data = request.get_json()

    # read from request
    task_title = data.get("task_title")
    task_description = data.get("task_description")
    assigned_to = data.get("assigned_to")

    if assigned_to == "self":
        # Search for "Adam" in db
        assigned_to = "1"

    task_due_date = data.get("task_due_date")

    # other values
    task_status = "in_progress"
    assigned_by = "1"
    created_at = now_utc
    task_due_date = now_utc + timedelta(days=2)

    cursor = db_connection.cursor()

    # todo, in_progress, completed

    cursor.execute(
        """
            INSERT INTO tasks
            (title, description, assigned_for, assigned_by, status, created_at, due_date)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """,
        (task_title, task_description, assigned_to, assigned_by, task_status, created_at, task_due_date)
    )

    db_connection.commit()

    return jsonify({"message": "User added!"})


@app.route("/discard_task", methods=["POST"])
def discard_task():
    cursor = db_connection.cursor()

    cursor.execute(
        """
        DELETE * FROM tasks
        WHERE id = ?
        """
    )

    return jsonify({"message": "Success"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5050)