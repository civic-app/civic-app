import json

import requests
from flask import request, jsonify
from flask_jwt_extended import jwt_required, current_user

from app import es
from app.main import main
from app.models.favorites import Favorites
from app.models.poll import Poll, Option
from app.models.users import User


@main.route("/")
def index():
    pass

@main.route("/test")
def test():
    user = User(username="test", password="test")
    user.save()
    return "Hello World Inserted"
