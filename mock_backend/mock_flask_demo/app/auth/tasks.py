# coding=utf-8
from flask_mail import Message

from app import celery, mail


@celery.task
def send_async_email(subject, email, message, ):
    """
    Background task to send an email with Flask-Mail.
    """
    from celery_worker import app
    with app.app_context():
        msg = Message(subject=subject,
                      recipients=[email], html=message)

        mail.send(msg)
