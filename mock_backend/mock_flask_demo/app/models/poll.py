import logging

from mongoengine import signals

from app import db, es
from app.models.users import User
import datetime


class Option(db.Document):
    def get_id(self):
        return str(self.pk)

    option = db.StringField()
    responses = db.ListField(db.ReferenceField(User), default=[])

    def get_json(self):
        return {
            "id": self.get_id(),
            "option": self.option,
            "num_responses": len(self.responses)
        }

    def num_responses(self):
        return len(self.responses)


# class Category(db.Document):
#     name = db.StringField()


class Poll(db.Document):
    user_id = db.StringField()
    categories = db.ListField(db.StringField(max_length=30))
    question = db.StringField()
    options = db.ListField(db.ReferenceField(Option), default=[])
    created = db.DateTimeField()
    updated = db.DateTimeField(default=datetime.datetime.utcnow())
    num_responses = db.IntField(default=0)

    # @property
    # def num_responses(self):
    #     return sum(map(lambda option: option.num_responses(), self.options))

    def get_id(self):
        return str(self.pk)

    def check_response(self, user):
        for item in self.options:
            if user in item.responses:
                return item.get_id()
        return None

    def has_category(self, category):
        return Poll.options(categories=category).order_by().first()

    def get_card_json(self):
        return {
            "id": self.get_id(),
            "question": self.question,
            "options": [item.get_json() for item in self.options]
        }

    @classmethod
    def pre_save(cls, sender, document, **kwargs):
        logging.debug("Pre Save: %s" % document.question)

    @classmethod
    def post_save(cls, sender, document, **kwargs):
        logging.debug("Post Save: %s" % document.question)
        es.index(index="poll_index",
                 id=document.get_id(),
                 doc_type="poll_index",
                 body={"question": document.question})


signals.post_save.connect(Poll.post_save, sender=Poll)
