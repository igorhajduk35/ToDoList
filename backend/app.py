from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

db_connection = psycopg2.connect(
    host="db",
    database="mydb",
    user="myuser",
    password="mypassword"
)

app = Flask(__name__)
CORS(app)


@app.route("/api")
def hello():
    cursor = db_connection.cursor()
    cursor.execute("SELECT 'Hello from PostgreSQL!' ")
    result = cursor.fetchone()
    return jsonify({"message": result[0]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5050)