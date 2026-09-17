import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

from models import db


load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

CORS(app)

db.init_app(app)
migrate = Migrate(app, db)



@app.route("/api/recipes", methods=["GET"])
def get_recipes():
    pass



if __name__ == "__main__":
    app.run(debug=True)
