import json
from functools import wraps
from os import abort

from flask import request
from flask_jwt_extended import current_user


def roles_required(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorated_view(*args, **kwargs):
            if not current_user:
                abort(404)
            for role in roles:
                if not current_user.has_role(role):
                    abort(401)
            return fn(*args, **kwargs)

        return decorated_view

    return wrapper


def roles_accepted(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorated_view(*args, **kwargs):
            if not current_user:
                abort(404)
            for role in roles:
                if current_user.has_role(role):
                    return fn(*args, **kwargs)
            abort(401)
            return decorated_view

    return wrapper


