from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from datetime import datetime, timezone

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    # don't cascade delete tickets when a user is deleted, just unassign them
    assigned_tickets = db.relationship("Ticket", back_populates="assigned_user", cascade="save-update, merge")
    ticket_notes = db.relationship("TicketNote", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.id} - {self.name}, {self.email}>"


class Customer(db.Model):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    phone_number = db.Column(db.String(30))
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    tickets = db.relationship("Ticket", back_populates="customer", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Customer {self.id} - {self.name} - {self.email} - {self.phone_number}>"


class Ticket(db.Model):
    __tablename__ = "tickets"

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"), nullable=False)
    assigned_user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    subject = db.Column(db.String(250), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), nullable=False, default="open")
    priority = db.Column(db.String(20), nullable=False, default="medium")
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    customer = db.relationship("Customer", back_populates="tickets")
    assigned_user = db.relationship("User", back_populates="assigned_tickets")
    notes = db.relationship("TicketNote", back_populates="ticket", cascade="all, delete-orphan")

    @validates("status")
    def validate_status(self, key, value):
        allowed_statuses = {"open", "in_progress", "resolved"}
        if not value or not value.strip():
            raise ValueError("Status cannot be empty")
        value = value.strip().lower()
        if value not in allowed_statuses:
            raise ValueError(f"Invalid status: {value} must be one of {allowed_statuses}")
        return value
    
    @validates("priority")
    def validate_priority(self, key, value):
        allowed_priorities = {"low", "medium", "high", "critical"}
        if not value or not value.strip():
            raise ValueError("Priority cannot be empty")
        value = value.strip().lower()
        if value not in allowed_priorities:
            raise ValueError(f"Invalid priority: {value} must be one of {allowed_priorities}")
        return value

    def __repr__(self):
        return f"<Ticket {self.id} - [{self.status}]{self.subject}: {self.description} - {self.priority} priority - Assigned to: {self.assigned_user_id}>"


class TicketNote(db.Model):
    __tablename__ = "ticket_notes"

    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey("tickets.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    ticket = db.relationship("Ticket", back_populates="notes")
    user = db.relationship("User", back_populates="ticket_notes")

    def __repr__(self):
        return f"<TicketNote {self.id} - Ticket {self.ticket_id}>"