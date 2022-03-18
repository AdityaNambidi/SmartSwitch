from flask import Flask, jsonify, render_template, request, session, redirect, url_for, flash
from models import User, db
from config import AppConfig
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from threading import Thread
import os
import json
from OTP import otpLoop, sendEmail, generateOTP


app = Flask(__name__)

app.config.from_object(AppConfig)

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

    # db.session.delete( User.query.filter_by( email= data['email'] ).one() )
    # db.session.commit()

    # return {1:0}

    user_exists = User.query.filter_by( email= data['email'] ).first()

    if user_exists:
        return jsonify({
            "error": "User aldredy exists exist"
        })

    hashed_password = bcrypt.generate_password_hash(data['password'])
    otp = generateOTP()

    new_user = User(email=data['email'], password= hashed_password, otp= otp)

    db.session.add(new_user)
    db.session.commit()
    
    otpThread = Thread(target= otpLoop, args= (db, User, data["email"], app, ))
    sendEmail(data['email'], str(otp))

    otpThread.start()

    return {"res": "OTP sent"}


@app.route("/confirm-otp", methods= ["POST"])
def otp():

    data = request.get_json()

    user_exists = User.query.filter_by( email= data['email'] ).first()

    if user_exists:
        User.query.filter_by( email= data['email']).all()[0].otp

    return None

@app.errorhandler(404)
def not_found(e):
    return render_template('index.html')

def run():
    app.run(host='0.0.0.0', debug= True)


if __name__ == "__main__":


    run()
