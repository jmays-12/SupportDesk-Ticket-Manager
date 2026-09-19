from app import app, db, bcrypt
from models import User, Customer, Ticket, TicketNote


def seed_database():
    with app.app_context():
        print("Clearing existing data...")

        # Delete in dependency order
        TicketNote.query.delete()
        Ticket.query.delete()
        Customer.query.delete()
        User.query.delete()

        db.session.commit()

        print("Creating users...")

        password_hash = bcrypt.generate_password_hash("test").decode("utf-8")

        test_user = User(
            name="Test User",
            email="test@test.com",
            password_hash=password_hash
        )

        admin = User(
            name="Admin User",
            email="admin@supportdesk.com",
            password_hash=password_hash
        )

        db.session.add_all([
            test_user,
            admin
        ])

        db.session.commit()

        print("Creating customers...")

        customer1 = Customer(
            name="John Smith",
            email="JSmith@example.com"
        )

        customer2 = Customer(
            name="Emily Davis",
            email="edavis@customer.com"
        )

        customer3 = Customer(
            name="Michael Brown",
            email="michael@example.com"
        )

        customer4 = Customer(
            name="Jessica Wilson",
            email="jessicaw@email.com"
        )

        customer5 = Customer(
            name="Robert Taylor",
            email="robert_taylor@test.com"
        )

        db.session.add_all([
            customer1,
            customer2,
            customer3,
            customer4,
            customer5
        ])

        db.session.commit()

        print("Creating tickets...")

        tickets = [
            Ticket(
                subject="URGENT: Critical priority ticket",
                description="critical ticket description",
                status="open",
                priority="critical",
                customer_id=customer1.id,
                assigned_user_id=admin.id
            ),

            Ticket(
                subject="Cannot log into my account",
                description="I am entering the correct password, but I keep getting an invalid password message.",
                status="open",
                priority="high",
                customer_id=customer2.id,
                assigned_user_id=test_user.id
            ),

            Ticket(
                subject="Website is slow",
                description="The dashboard is very slow to respond",
                status="in_progress",
                priority="high",
                customer_id=customer3.id,
                assigned_user_id=admin.id
            ),

            Ticket(
                subject="Billing question",
                description="I have a question about the charge on an invoice",
                status="in_progress",
                priority="medium",
                customer_id=customer4.id,
                assigned_user_id=test_user.id
            ),

            Ticket(
                subject="How do I change my email?",
                description="I need to update the email address associated with my account.",
                status="closed",
                priority="low",
                customer_id=customer5.id,
                assigned_user_id=None
            ),

            Ticket(
                subject="Password reset request",
                description="Customer requested assistance resetting their password.",
                status="in_progress",
                priority="medium",
                customer_id=customer1.id,
                assigned_user_id=test_user
            ),

            Ticket(
                subject="Unable to upload attachment",
                description="The customer receives an error when attempting to upload a PDF attachment.",
                status="open",
                priority="medium",
                customer_id=customer2.id,
                assigned_user_id=None
            ),

            Ticket(
                subject="Incorrect account information",
                description="Customer reports that their account information is displaying incorrectly.",
                status="open",
                priority="low",
                customer_id=customer3.id,
                assigned_user_id=None
            ),
        ]

        db.session.add_all(tickets)
        db.session.commit()

        print()
        print("====================================")
        print("    Database seeded successfully    ")
        print("====================================")
        print()
        print("Test accounts:")
        print()
        print("  test@test.com")
        print("  admin@supportdesk.com")
        print("  user@supportdesk.com")
        print()
        print("Password for ALL accounts:")
        print("test")
        print()
        print(f"Created {len(tickets)} tickets.")
        print("Includes critical, high, medium, and low priority tickets.")
        print("===================================")


if __name__ == "__main__":
    seed_database()
