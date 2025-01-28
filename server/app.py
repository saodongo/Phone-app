# Backend: Flask APIfrom flask import Flask
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, Profile, Feature, Phone


# Initialize Flask app
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///phone_management.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'

#  Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)



# Routes
@app.route('/profiles', methods=['POST'])
def create_profile():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    new_profile = Profile(name=name, email=email)
    db.session.add(new_profile)
    db.session.commit()
    return jsonify({'id': new_profile.id, 'name': new_profile.name, 'email': new_profile.email}), 201

@app.route('/profiles', methods=['GET'])
def get_profiles():
    profiles = Profile.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'email': p.email} for p in profiles])

@app.route('/phones', methods=['POST'])
def create_phone():
    data = request.get_json()
    brand = data.get('brand')
    model = data.get('model')
    profile_id = data.get('profile_id')
    new_phone = Phone(brand=brand, model=model, profile_id=profile_id)
    db.session.add(new_phone)
    db.session.commit()
    return jsonify({'id': new_phone.id, 'brand': new_phone.brand, 'model': new_phone.model, 'profile_id': new_phone.profile_id}), 201

@app.route('/phones', methods=['GET'])
def get_phones():
    phones = Phone.query.all()
    return jsonify([{
        'id': phone.id,
        'brand': phone.brand,
        'model': phone.model,
        'profile_id': phone.profile_id
    } for phone in phones])

@app.route('/features', methods=['POST'])
def create_feature():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description', '')
    new_feature = Feature(name=name, description=description)
    db.session.add(new_feature)
    db.session.commit()
    return jsonify({'id': new_feature.id, 'name': new_feature.name, 'description': new_feature.description}), 201

@app.route('/features', methods=['GET'])
def get_features():
    features = Feature.query.all()
    return jsonify([{
        'id': feature.id,
        'name': feature.name,
        'description': feature.description
    } for feature in features])

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)


