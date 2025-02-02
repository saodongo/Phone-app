
from app import app, db  # Ensure `app` is imported
from models import Profile, Phone, Feature
from sqlalchemy.exc import IntegrityError

with app.app_context():  # Use `app.app_context()`
    Profile.query.delete()
    Phone.query.delete()
    Feature.query.delete()

    # Add and commit profiles first to ensure IDs are generated
    profiles = [
        Profile(name="John Doe", email="john@example.com",  ),
        Profile(name="Jane Smith", email="jane@example.com"),
        Profile(name="Alice Brown", email="alice@example.com"),

    ]
    profile1 = Profile(name="John Doe", email="john@example.com" )
    # db.session.add(profile1)
    # db.session.commit()

    profile2 = Profile(name="jane smith", email="jane@example.com" )
    db.session.add(profile1)
    db.session.commit()

    
    profile3 = Profile(name="Alice Brown", email="alice@example.com" )
    db.session.add(profile1)
    db.session.commit()





    phones= Phone(brand="Redmie", model="note 13",profile_id = 1) 
    db.session.add(phones)
    db.session.commit()
       
    features = Feature (name = "Motorolla C17", description = "Touch Screen")
    db.session.add(features)
    db.session.commit()

#     try:
#         db.session.commit()
#     except IntegrityError:
#         db.session.rollback()

#     # Retrieve committed profiles to ensure IDs exist
#     profiles = Profile.query.all()
    

#     # Add and commit phones
#     phones = [
#         Phone(brand="Apple", model="iPhone 14", profile_id=profiles[0].id),
#         Phone(brand="Samsung", model="Galaxy S23", profile_id=profiles[1].id),
#         Phone(brand="Google", model="Pixel 7", profile_id=profiles[2].id),
#     ]

#     db.session.add_all(phones)

#     try:
#         db.session.commit()
#     except IntegrityError:
#         db.session.rollback()

#     # Add and commit features
#     features = [
#         Feature(name="5G Support", description="Enables faster data speeds."),
#         Feature(name="Wireless Charging", description="Supports wireless charging."),
#         Feature(name="Water Resistance", description="Protected against water and dust."),
#     ]

#     db.session.add_all(features)

#     try:
#         db.session.commit()
#     except IntegrityError:
#         db.session.rollback()

# print("Database successfully seeded!")
