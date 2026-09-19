
import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate

from models import db, User, Customer, Ticket


load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

CORS(app)
bcrypt = Bcrypt(app)

db.init_app(app)
migrate = Migrate(app, db)


# auth routes

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()

    if not data.get("name") or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Name, email, and password are required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already in use"}), 409

    hashed = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    user = User(name=data["name"], email=data["email"], password_hash=hashed)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    }), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if not user or not bcrypt.check_password_hash(
        user.password_hash,
        data["password"]
    ):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    }), 200


# customer routes

@app.route("/api/customers", methods=["GET"])
def get_customers():
    customers = Customer.query.order_by(Customer.id).all()

    return jsonify([
        {
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "phone_number": customer.phone_number
        }
        for customer in customers
    ]), 200


@app.route("/api/customers", methods=["POST"])
def create_customer():
    data = request.get_json()

    if not data.get("name") or not data.get("email"):
        return jsonify({"error": "Name and email are required"}), 400

    if Customer.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Customer email already in use"}), 409

    customer = Customer(
        name=data["name"],
        email=data["email"],
        phone_number=data.get("phone_number")
    )

    db.session.add(customer)
    db.session.commit()

    return jsonify({
        "id": customer.id,
        "name": customer.name,
        "email": customer.email,
        "phone_number": customer.phone_number
    }), 201


@app.route("/api/customers/<int:id>", methods=["PATCH"])
def update_customer(id):
    customer = db.session.get(Customer, id)

    if not customer:
        return jsonify({"error": "Customer not found"}), 404

    data = request.get_json()

    if "name" in data:
        if not data["name"]:
            return jsonify({"error": "Name cannot be empty"}), 400
        customer.name = data["name"]

    if "email" in data:
        if not data["email"]:
            return jsonify({"error": "Email cannot be empty"}), 400

        existing_customer = Customer.query.filter_by(
            email=data["email"]
        ).first()

        if existing_customer and existing_customer.id != customer.id:
            return jsonify({"error": "Customer email already in use"}), 409

        customer.email = data["email"]

    if "phone_number" in data:
        customer.phone_number = data["phone_number"]

    db.session.commit()

    return jsonify({
        "id": customer.id,
        "name": customer.name,
        "email": customer.email,
        "phone_number": customer.phone_number
    }), 200


@app.route("/api/customers/<int:id>", methods=["DELETE"])
def delete_customer(id):
    customer = db.session.get(Customer, id)

    if not customer:
        return jsonify({"error": "Customer not found"}), 404

    db.session.delete(customer)
    db.session.commit()

    return jsonify({"message": "Customer deleted successfully"}), 200


if __name__ == "__main__":
    app.run(debug=True)