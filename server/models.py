from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy
# Models
class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phones = db.relationship('Phone', backref='profile', cascade="all, delete-orphan")

class Phone(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)
    features = db.relationship('Feature', secondary='phone_feature', back_populates='phones')

class Feature(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    phones = db.relationship('Phone', secondary='phone_feature', back_populates='features')

class PhoneFeature(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone_id = db.Column(db.Integer, db.ForeignKey('phone.id'), nullable=False)
    feature_id = db.Column(db.Integer, db.ForeignKey('feature.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
