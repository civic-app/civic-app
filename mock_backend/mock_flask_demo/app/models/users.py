from app import bcrypt
from app import db


class Role(db.Document):
    name = db.StringField(max_length=80, unique=True)
    description = db.StringField(max_length=255)


class User(db.Document):
    social_id = db.StringField()
    username = db.StringField()
    full_name = db.StringField()
    roles = db.ListField(db.ReferenceField(Role), default=[])
    email = db.StringField()
    password = db.StringField()
    password_reset_code = db.StringField()
    email_confirmed = db.StringField()
    email_verification_code = db.StringField()

    def clean(self):
        # clean will be called when you call .save()
        # You can do whatever you'd like to clean data before save
        # self.password = self.hash_password(self.password)
        print(self.password)

    def hash_password(self, password):
        if not password:
            return ""
        return bcrypt.generate_password_hash(password, 12)

    def get_id(self):
        return str(self.pk)

    def has_role(self, role):
        return role in self.roles

    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False
