from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from models import User, Customer, Ticket, TicketNote


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        exclude = ("password_hash",)

    id = fields.Int(dump_only=True)


class CustomerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Customer

    id = fields.Int(dump_only=True)


class TicketSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Ticket

    id = fields.Int(dump_only=True)

    customer_name = fields.Method(
        "get_customer_name",
        dump_only=True
    )

    assigned_user_name = fields.Method(
        "get_assigned_user_name",
        dump_only=True
    )

    def get_customer_name(self, obj):
        return obj.customer.name

    def get_assigned_user_name(self, obj):
        return obj.assigned_user.name if obj.assigned_user else None


class TicketNoteSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = TicketNote

    id = fields.Int(dump_only=True)

    user_name = fields.Method(
        "get_user_name",
        dump_only=True
    )

    def get_user_name(self, obj):
        return obj.user.name