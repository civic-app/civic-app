import os

from celery import Celery
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_elasticsearch import FlaskElasticsearch
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_mongoengine import MongoEngine
from flask_wtf.csrf import CSRFProtect

from config import config

es = FlaskElasticsearch()
db = MongoEngine()
celery = Celery(__name__,
                broker=os.environ.get('CELERY_BROKER_URL', 'redis://'),
                backend=os.environ.get('CELERY_BROKER_URL', 'redis://'))

jwt = JWTManager()
bcrypt = Bcrypt()
csrf = CSRFProtect()
mail = Mail()
cors = CORS()


def create_app(config_name="development"):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    register_blueprints(app)
    register_extensions(app, config_name)

    @app.route("/")
    def index():
        return "hello world"

    return app


def register_blueprints(flask_app):
    from app.auth import auth
    flask_app.register_blueprint(auth, url_prefix='/auth')
    from app.main import main
    flask_app.register_blueprint(main)


def register_extensions(app, config_name):
    db.init_app(app)
    es.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    celery.conf.update(config[config_name].CELERY_CONFIG)
    initialize_celery(app)
    # csrf.init_app(app) TODO seperate UI to add mobile support

    cors.init_app(app)

    @app.before_first_request
    def before_first_request():
        for es_config in config[config_name].ES_INDICES:
            es.indices.create(index=es_config["index"], body=es_config["body"], ignore=[400, 404])


def initialize_celery(app):
    """
    Initialise celery to run with context
    :param app: The app which celery binds too
    :return: Nothing
    """
    TaskBase = celery.Task

    class ContextTask(TaskBase):
        abstract = True

        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)

    celery.Task = ContextTask
