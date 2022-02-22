from flask import Flask, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+mysqlconnector://{}:{}@{}/{}".format(
    Config.DATABASE_USER,
    Config.DATABASE_PASS,
    Config.DATABASE_URI,
    Config.DATABASE_NAME
)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from models import Presigned

@app.route("/")
def hello_from_root():
    return jsonify(message='Hello from root!')

@app.route("/hello")
def hello():
    return jsonify(message='Hello from path!')

@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
