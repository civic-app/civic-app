from app import db
from app.models.poll import Poll


class Favorites(db.Document):
    user_id = db.StringField()
    polls = db.ListField(db.ReferenceField(Poll), default=[])

    def get_id(self):
        return str(self.pk)

    def has_poll(self, id):
        return id in self.polls

    def add_poll(self, id):
        self.polls.append(id)
        self.save()
