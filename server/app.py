from flask import Flask, jsonify, request, make_response
# import os
# from dotenv import load_.env
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, Phone, Profile, Feature

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///phone_management.db'
app.config['SQLACHEMY_TRACK_MODIFICATIONS'] = False



db.init_app(app)
Migrate = Migrate (app, db)



with app.app_context():
    db.create_all()

@app.route('/profiles', methods=['POST'])
def create_profile():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')

    if not name or not email:
        return make_response(jsonify({"error": "Name and email are required"}), 400)

    new_profile = Profile(name=name, email=email)
    db.session.add(new_profile)
    db.session.commit()
    return jsonify({'id': new_profile.id, 'name': new_profile.name, 'email': new_profile.email}), 201


@app.route('/profiles', methods=['GET'])
def get_profiles():
    profiles = Profile.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'email': p.email} for p in profiles])


@app.route('/profiles/<int:profile_id>', methods=['GET'])
def get_profile_by_id(profile_id):
    profile = Profile.query.get(profile_id)
    if not profile:
        return make_response(jsonify({"error": "Profile not found"}), 404)
    return jsonify({'id': profile.id, 'name': profile.name, 'email': profile.email})

@app.route('/profiles/<int:profile_id>', methods=['PATCH'])
def update_profile(profile_id):
    profile = Profile.query.get(profile_id)
    if not profile:
        return make_response(jsonify({"error": "Profile not found"}), 404)

    data = request.get_json()
    profile.name = data.get('name', profile.name)
    profile.email = data.get('email', profile.email)
    db.session.commit()
    return jsonify({'id': profile.id, 'name': profile.name, 'email': profile.email}), 200

@app.route('/profiles/<int:profile_id>', methods=['DELETE'])
def delete_profile(profile_id):
    profile = Profile.query.get(profile_id)
    if not profile:
        return make_response(jsonify({"error": "Profile not found"}), 404)

    db.session.delete(profile)
    db.session.commit()
    return jsonify({"message": "Profile deleted successfully"}), 200


@app.route('/phones', methods=['POST'])
def create_phone():
    data = request.get_json()
    brand = data.get('brand')
    model = data.get('model')
    profile_id = data.get('profile_id')

    if not brand or not model or not profile_id:
        return make_response(jsonify({"error": "Brand, model, and profile_id are required"}), 400)

    new_phone = Phone(brand=brand, model=model, profile_id=profile_id)
    db.session.add(new_phone)
    db.session.commit()
    return jsonify({'id': new_phone.id, 'brand': new_phone.brand, 'model': new_phone.model, 'profile_id': new_phone.profile_id}), 201

@app.route('/phones', methods=['GET'])
def get_phones():
    phones = Phone.query.all()
    return jsonify([{'id': phone.id, 'brand': phone.brand, 'model': phone.model, 'profile_id': phone.profile_id} for phone in phones])

@app.route('/phones/<int:phone_id>', methods=['GET'])
def get_phone_by_id(phone_id):
    phone = Phone.query.get(phone_id)
    if not phone:
        return make_response(jsonify({"error": "Phone not found"}), 404)
    return jsonify({'id': phone.id, 'brand': phone.brand, 'model': phone.model, 'profile_id': phone.profile_id})

@app.route('/phones/<int:phone_id>', methods=['PATCH'])
def update_phone(phone_id):
    phone = Phone.query.get(phone_id)
    if not phone:
        return make_response(jsonify({"error": "Phone not found"}), 404)

    data = request.get_json()
    phone.brand = data.get('brand', phone.brand)
    phone.model = data.get('model', phone.model)
    db.session.commit()
    return jsonify({'id': phone.id, 'brand': phone.brand, 'model': phone.model, 'profile_id': phone.profile_id}), 200

@app.route('/phones/<int:phone_id>', methods=['DELETE'])
def delete_phone(phone_id):
    phone = Phone.query.get(phone_id)
    if not phone:
        return make_response(jsonify({"error": "Phone not found"}), 404)

    db.session.delete(phone)
    db.session.commit()
    return jsonify({"message": "Phone deleted successfully"}), 200


@app.route('/features', methods=['POST'])
def create_feature():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description', '')

    if not name:
        return make_response(jsonify({"error": "Name is required"}), 400)

    new_feature = Feature(name=name, description=description)
    db.session.add(new_feature)
    db.session.commit()
    return jsonify({'id': new_feature.id, 'name': new_feature.name, 'description': new_feature.description}), 201

@app.route('/features', methods=['GET'])
def get_features():
    features = Feature.query.all()
    return jsonify([{'id': feature.id, 'name': feature.name, 'description': feature.description} for feature in features])

@app.route('/features/<int:feature_id>', methods=['GET'])
def get_feature_by_id(feature_id):
    feature = Feature.query.get(feature_id)
    if not feature:
        return make_response(jsonify({"error": "Feature not found"}), 404)
    return jsonify({'id': feature.id, 'name': feature.name, 'description': feature.description})

@app.route('/features/<int:feature_id>', methods=['PATCH'])
def update_feature(feature_id):
    feature = Feature.query.get(feature_id)
    if not feature:
        return make_response(jsonify({"error": "Feature not found"}), 404)

    data = request.get_json()
    feature.name = data.get('name', feature.name)
    feature.description = data.get('description', feature.description)
    db.session.commit()
    return jsonify({'id': feature.id, 'name': feature.name, 'description': feature.description}), 200

@app.route('/features/<int:feature_id>', methods=['DELETE'])
def delete_feature(feature_id):
    feature = Feature.query.get(feature_id)
    if not feature:
        return make_response(jsonify({"error": "Feature not found"}), 404)

    db.session.delete(feature)
    db.session.commit()
    return jsonify({"message": "Feature deleted successfully"}), 200


if __name__ == '__main__':
    app.run(debug=True)
