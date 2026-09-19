# SupportDesk

A full-stack customer support ticketing app built with React and Flask. Businesses can use it to track customer issues, assign tickets to team members, and manage support requests from one central place instead of scattered across emails and messages.

## Tech Stack

**Frontend:** React, React Router, Tailwind CSS

**Backend:** Flask, SQLAlchemy, Flask-Bcrypt, Flask-Migrate, Flask-CORS

**Database:** PostgreSQL

## Features

- User signup and login with hashed passwords
- Create, edit, and delete customer records
- Create and manage support tickets
- Assign tickets to team members
- Set ticket status (open, in progress, resolved) and priority (low, medium, high, critical)
- Add notes to tickets to track progress
- Color coded status and priority badges for quick scanning

## Getting Started

### Prerequisites

- Python 3.x
- Node.js
- PostgreSQL

### Backend Setup

1. Clone the repo and navigate to the server folder

```
cd server
```

2. Create and activate a virtual environment

```
python -m venv venv
source venv/bin/activate
```

3. Install dependencies

```
pip install -r requirements.txt
```

4. Create a `.env` file in the server folder using `.env.example` as a reference

```
DATABASE_URL=postgresql://your_user:your_password@localhost/supportdesk
JWT_SECRET_KEY=your_secret_key
```

5. Create the PostgreSQL database

```
createdb supportdesk
```

6. Run migrations

```
flask db upgrade
```

7. (Optional) Seed database with sample data

```
python seed.py
```
This creates test accounts, tickets, ticketnotes and customers.

The test account login is:
Email: test@test.com
Password: test


8. Start the Flask server

```
python app.py
```

The backend will be running at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the client folder

```
cd client
```

2. Install dependencies

```
npm install
```

3. Start the dev server

```
npm run dev
```

The frontend will be running at `http://localhost:5173`.

## API Endpoints 
Protected endpoints require a valid JWT access token in the Authorization header.

### Auth
- `POST /api/signup` - create a new user account
- `POST /api/login` - log in with email and password

### Users
- `GET /api/users` - get all users (used for the assign ticket dropdown)

### Customers
- `GET /api/customers` - get all customers
- `POST /api/customers` - create a customer
- `PATCH /api/customers/<id>` - update a customer
- `DELETE /api/customers/<id>` - delete a customer

### Tickets
- `GET /api/tickets` - get all tickets
- `GET /api/tickets/<id>` - get a single ticket with its notes
- `POST /api/tickets` - create a ticket
- `PATCH /api/tickets/<id>` - update a ticket
- `DELETE /api/tickets/<id>` - delete a ticket

### Notes
- `POST /api/tickets/<id>/notes` - add a note to a ticket
- `PATCH /api/notes/<id>` - update a note
- `DELETE /api/notes/<id>` - delete a note

## Project Structure

```
supportdesk/
  client/             React frontend
    components/
      NavBar.jsx      Navigation bar
    pages/
      Auth.jsx        Handles signup and login
      Customers.jsx   Customer list view
      Dashboard.jsx   Ticket summary and recent tickets
      Tickets.jsx     Ticket list and management
    api.js            API helper function
  server/             Flask backend
    app.py            API routes
    models.py         Database models
    migrations/       Alembic migration files
    seed.py           Sample data for testing
```