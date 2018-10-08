# coding=utf-8
import datetime
import os

from dotenv import load_dotenv, find_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)


class Config(object):
    """
    Initial Configurations for the Flask App
    """
    CSRF_ENABLED = True
    DEBUG = False
    SECRET_KEY = os.environ.get("SECRET_KEY", "INSERT_KEY_HERE")  # b64encode(os.urandom(24)).decode("utf-8")
    expires = datetime.timedelta(days=30)
    JWT_ACCESS_TOKEN_EXPIRES = expires
    JWT_REFRESH_TOKEN_EXPIRES = datetime.timedelta(days=60)

    JWT_TOKEN_LOCATION = ['cookies', 'headers']
    JWT_IDENTITY_CLAIM = 'sub'
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_COOKIE_SECURE = False
    MONGODB_USERNAME = os.getenv("MONGODB_USERNAME")
    MONGODB_PASSWORD = os.getenv("MONGODB_PASSWORD")
    MONGODB_HOST = os.getenv("MONGODB_HOST")
    MONGODB_PORT = int(os.getenv("MONGODB_PORT"))
    MONGODB_DATABASE_NAME = os.getenv("MONGODB_DATABASE_NAME")

    CELERY_CONFIG = {
        'CELERY_BROKER_URL': 'redis://localhost:6379/0',
        'CELERY_RESULT_BACKEND': 'redis://localhost:6379/0',
        'CELERYD_TASK_SOFT_TIME_LIMIT': 120,
        "CELERY_TASK_SERIALIZER": "json"
    }
    ELASTICSEARCH_HOST = os.environ.get("ELASTICSEARCH_HOST")

    ES_INDICES = [{
        "index": "polls",
        "body": {
            "mapping": {
                "question": {"type": "string"},
                "categories": {"type": "list"}
            }
        }
    }]


class DevelopmentConfig(Config):
    """
    Developmental Configurations
    """
    DEBUG = True
    LOCALE_DEFAULT = "en_US"


class ProductionConfig(Config):
    """
    Production Configurations
    """
    DEBUG = False
    LOCALE_DEFAULT = 'en_US.utf8'
    JWT_COOKIE_SECURE = True


class TestingConfig(Config):
    """
    Testing Configurations
    """
    TESTING = True
    CSRF_ENABLED = False


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig
}
