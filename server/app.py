import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate

from models import db, User


load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

CORS(app)
bcrypt = Bcrypt(app)

db.init_app(app)
migrate = Migrate(app, db)


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "api is running"}), 200


# auth routes

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()

    if not data.get("name") or not data.get("email") or not data.get("password"):
        return jsonify({"Error": "Name, email, and password are required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"Error": "Email already in use"}), 409

    hashed = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    user = User(name=data["name"], email=data["email"], password_hash=hashed)

    db.session.add(user)
    db.session.commit()

    return jsonify({"id": user.id, "name": user.name, "email": user.email}), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"Error": "Email and password are required"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if not user or not bcrypt.check_password_hash(user.password_hash, data["password"]):
        return jsonify({"Error": "Invalid email or password"}), 401

    return jsonify({"id": user.id, "name": user.name, "email": user.email}), 200


if __name__ == "__main__":
    app.run(debug=True)