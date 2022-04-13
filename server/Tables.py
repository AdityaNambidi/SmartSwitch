from datetime import datetime
from email.policy import default
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    
    __tablename__ = "users"

    email = db.Column(db.String(321), primary_key= True, unique=True)
    password = db.Column(db.String(100), nullable= False)
    date_added = db.Column(db.DateTime, default= datetime.now)
    otp = db.Column( db.Integer, nullable = False )
    emailConfirmed = db.Column( db.Integer, default= 0 )


class UserSwitches(db.Model):

    __tablename__ = "user_switches"

    email = db.Column(db.String(321), primary_key= True, unique=True)
    switch_list = db.Column( db.JSON, default= [] )

class Switches(db.Model):

    __tablename__ = "switches"

    email = db.Column(db.String(321))
    date_added = db.Column(db.DateTime, default= datetime.now)
    switch = db.Column( db.String(6), primary_key= True)
    state = db.Column( db.Integer )