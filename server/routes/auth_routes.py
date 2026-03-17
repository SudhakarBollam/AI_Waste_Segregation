from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

from utils.db import get_connection

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.json
    username = data["username"]
    password = generate_password_hash(data["password"])

    conn = get_connection()
    cur = conn.cursor()

    try:
        cur.execute(
            "INSERT INTO users(username,password) VALUES (?,?)",
            (username, password)
        )
        conn.commit()
    except:
        return jsonify({"error": "User already exists"}), 400

    conn.close()

    return jsonify({"message": "Registration successful"})


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM users WHERE username=?",
        (data["username"],)
    )

    user = cur.fetchone()

    conn.close()

    if user and check_password_hash(user["password"], data["password"]):
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"error": "Invalid credentials"}), 401