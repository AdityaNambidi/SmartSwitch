from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    email = db.Column(db.String(321), primary_key= True, unique=True)
    password = db.Column(db.String(100), nullable= False)
    date_added = db.Column(db.DateTime, default= datetime.now)

