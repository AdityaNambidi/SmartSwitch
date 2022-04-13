from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager, set_access_cookies
from threading import Thread
from datetime import datetime, timedelta, timezone
from OTP import otpLoop, sendEmail, generateOTP
from Tables import db, User, Switches, UserSwitches
from Config import AppConfig

app = Flask(__name__)
app.config.from_object(AppConfig)

db.init_app(app)
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


@app.after_request
def refresh_expiring_jwts(response):
    try:
        
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)

        return response
    
    except (RuntimeError, KeyError):
        
        return response


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/Login", methods= ["POST"])
def login(): 

    data = request.json

    user = User.query.filter_by(email= data['email'] ).first()

    if user is None:
        return {
            "type": "error",
            "res": "Account does not exist"
        }

    if not bcrypt.check_password_hash(user.password, data['password']):
        return {
            "type": "error",
            "res": "Password incorrect"
        }

    access_token = create_access_token( identity= data['email'] )

    return {
        "type": "res",
        "res": "Signed in",
        "token": access_token
    }


@app.route("/createAccount", methods= ["POST"])
def createAcc(): 
    
    data = request.json

    # db.session.delete( User.query.filter_by( email= data['email'] ).one() )
    # db.session.commit()

    # return {1:0}

    user_exists = User.query.filter_by( email= data["email"]).first()

    if user_exists:
        return {
           "type": "error",
            "res": "Account aldredy exists exist"
        }

    hashed_password = bcrypt.generate_password_hash(data['password'])
    otp = generateOTP()

    new_user = User(email=data['email'], password= hashed_password, otp= otp)

    emailSent = sendEmail(data['email'], str(otp))

    if emailSent == "Something went wrong":
        return {
            "type": "error",
            "res": "Something went wrong while sending the OTP"
        }

    db.session.add(new_user)
    db.session.commit()
    
    otpThread = Thread(target= otpLoop, args= (db, User, data["email"], app, ))


    otpThread.start()

    return {
        "type": "res",
        "res": "OTP sent"
    }


@app.route("/confirm-otp", methods= ["POST"])
def otp():

    data = request.get_json()

    user = User.query.filter_by( email= data["email"]).first()

    if user is None:
        return { 
           "type": "error",
            "res" : "OTP Expired" 
        }


    if int(data["otp"]) == user.otp:
        user.emailConfirmed = 1
        db.session.commit()

    access_token = create_access_token( identity= data['email'] )
    newList = UserSwitches( email= user.email )

    db.session.add(newList)
    db.session.commit()

    return { 
        "type": "res",
        "res": "Account Created",
        "token": access_token
    }


@app.route("/is-logged-in", methods= ["POST"])
@jwt_required()
def isLoggedIn():
    return {"msg": "yes"}

@app.route("/logout", methods= ["POST"])
def logout():

    response = jsonify({"msg": "logout successful"})

    unset_jwt_cookies(response)
    
    return response


@app.route("/get-switches", methods= ["POST"])
@jwt_required()
def getSwitches():

    email = request.get_json()["email"]

    switchList = UserSwitches.query.filter_by( email= email).first()

    res = {
        "switches": switchList.switch_list
    }

    return res


@app.route("/add-switch", methods= ["POST"])
@jwt_required()
def addSwitch():

    email = request.get_json()["email"]
    switchID = request.get_json()["switch-id"]

    user = UserSwitches.query.filter_by( email = email ).first()

    switch_list = user.switch_list
    new_switch_list = []

    for s in switch_list:
        new_switch_list.append(s)

    new_switch_list.append(switchID)
    user.switch_list = new_switch_list

    switch = Switches( email = email, switch= switchID, state = 0 )

    db.session.add(switch)
    db.session.commit() 

    res = {
        "res": "switch added"
    }

    return res



@app.route("/toggle-switch", methods= ["POST"])
@jwt_required()
def toggleSwitch():

    data = request.get_json()

    switch = Switches.query.filter_by( switch = data["switch"] ).first()

    switch.state = data["state"]

    db.session.commit()

    res = {
        "res": "state toggled"
    }

    return res


@app.route("/check-switch", methods= ["POST"])
@jwt_required()
def checkSwitch():

    data = request.get_json()

    switch = Switches.query.filter_by( switch = data["switch"] ).first()

    res = {
        "res": switch.state
    }

    return res

@app.errorhandler(404)
def not_found(e):
    return render_template('index.html')

def run():
    app.run(host='0.0.0.0', debug= True)


if __name__ == "__main__":


    run()
