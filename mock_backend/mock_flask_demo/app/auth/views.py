import json

from flask import url_for, jsonify, render_template, flash, request
from flask_jwt_extended import (
    create_access_token,
    unset_jwt_cookies, current_user,
    create_refresh_token, jwt_refresh_token_required)
from werkzeug.utils import redirect

from app import csrf
from app import jwt
from app.auth import auth
from app.auth.oauth import OAuthSignIn
from app.models.users import User

csrf.exempt(auth)


def is_mobile_request():
    return request.args.get("mobile") is not None


@jwt.user_loader_callback_loader
def user_loader_callback(identity):
    print(identity)
    user = User.objects(pk=identity).first()
    return user


@auth.route("/login")
def login():
    return render_template("auth/login.html")


def get_decoded_data(data):
    return json.loads(data.decode(encoding='UTF-8'))


@auth.route("/register", methods=["POST", "GET"])
def register():
    full_name = request.json.get("name")
    username = request.json.get("username")
    password = request.json.get("password")
    if User.objects(username=username).first() is None:
        user = User(full_name=full_name, username=username, password=password)
        user.save()
        return jsonify({"message": "user created "}), 200
    return jsonify({"message": "User already exists "}), 403


@auth.route('/login/<provider>', methods=["POST", "GET"])
def oauth_authorize(provider="email"):
    if provider == "email":
        username, password = request.json.get("username"), request.json.get("password")
        user = User.objects(username=username).first()
        if user is None:
            return jsonify({"message": "User does not exist"}), 400
        if user and user.password == password:
            return jsonify({"data": login_and_redirect(user)})
        else:
            return jsonify({"message": "Incorrect Password"}), 400
    oauth = OAuthSignIn.get_provider(provider)
    return oauth.authorize()


@auth.route('/callback/<provider>')
def oauth_callback(provider):
    if not current_user.is_anonymous():
        return redirect(url_for('index'))
    oauth = OAuthSignIn.get_provider(provider)
    social_id, username, email = oauth.callback()
    if social_id is None:
        flash('Authentication failed.')
        return redirect(url_for('index'))
    user = add_user(social_id, username, email)
    return login_and_redirect(user)


@auth.route('/logout')
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return redirect(url_for("index"))


def add_user(social_id, username, email):
    user = User.objects(social_id=social_id).first()
    if not user:
        user = User(social_id=social_id, username=username, email=email)
        user.save()
    return user


@auth.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    ret = {
        'access_token': create_access_token(identity=current_user.get_id())
    }
    return jsonify({"data": ret}), 200


def login_and_redirect(user):
    # resp = jsonify({'login': True})
    access_token = create_access_token(identity=user.get_id())
    refresh_token = create_refresh_token(identity=user.get_id())
    return {"access_token": access_token, "refresh_token": refresh_token}
    # set_access_cookies(resp, access_token)
    # return redirect(url_for('index'))
