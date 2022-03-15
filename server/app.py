from flask import Flask, jsonify, render_template, request, session, redirect, url_for, flash
from models import User, db
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import os
import json

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database/users.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]

db.init_app(app)
CORS(app)
bcrypt = Bcrypt(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/Login", methods= ["POST"])
def login(): 

    data = request.json

    user = User.query.filter_by(email= data['email'] ).first()

    if user is None:
        return jsonify({
            "error": "User does not exist"
        })

    if not bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({
            "error": "Password incorrect"
        })

    return "balls"

@app.route("/createAccount", methods= ["POST"])
def createAcc(): 
        
    data = request.json

    user_exists = User.query.filter_by( email= data['email'] ).first()

    if user_exists:
        return jsonify({
            "error": "User aldredy exists exist"
        })

    hashed_password = bcrypt.generate_password_hash(data['password'])

    new_user = User(email=data['email'], password= hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return {"nig": "ninini"}

@app.errorhandler(404)
def not_found(e):
    return render_template('index.html')

def run():
    app.run(host='0.0.0.0', debug= True)


if __name__ == "__main__":
    run()
