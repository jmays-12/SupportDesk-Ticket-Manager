from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    # don't cascade delete tickets when a user is deleted, just unassign them
    assigned_tickets = db.relationship("Ticket", back_populates="assigned_user", cascade="save-update, merge")
    ticket_notes = db.relationship("TicketNote", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.id} - {self.name}, {self.email}>"


class Customer(db.Model):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    phone_number = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    tickets = db.relationship("Ticket", back_populates="customer", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Customer {self.id} - {self.name} - {self.email} - {self.phone_number}>"


class Ticket(db.Model):
    __tablename__ = "tickets"

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"), nullable=False)
    assigned_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    subject = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String, nullable=False, default="open")      # "open", "in_progress", "resolved"
    priority = db.Column(db.String, nullable=False, default="medium")  # "low", "medium", "high"
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    customer = db.relationship("Customer", back_populates="tickets")
    assigned_user = db.relationship("User", back_populates="assigned_tickets")
    notes = db.relationship("TicketNote", back_populates="ticket", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Ticket {self.id} - {self.subject}>"


class TicketNote(db.Model):
    __tablename__ = "ticket_notes"

    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey("tickets.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    ticket = db.relationship("Ticket", back_populates="notes")
    user = db.relationship("User", back_populates="ticket_notes")

    def __repr__(self):
        return f"<TicketNote {self.id} - Ticket {self.ticket_id}>"