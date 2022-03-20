from flask import Flask, render_template, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from threading import Thread
from OTP import otpLoop, sendEmail, generateOTP
from Tables import User, db
from Config import AppConfig

app = Flask(__name__)
app.config.from_object(AppConfig)

db.init_app(app)
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

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

    db.session.add(new_user)
    db.session.commit()
    
    otpThread = Thread(target= otpLoop, args= (db, User, data["email"], app, ))

    emailSent = sendEmail(data['email'], str(otp))

    if emailSent == "Something went wrong":
        return {
            "type": "error",
            "res": "Something went wrong while sending the OTP"
        }

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

    return { 
        "type": "res",
        "res": "Account Created",
        "token": access_token
    }


@app.route("/get-data", methods= ["POST"])
@jwt_required()
def getData():
    return {"res": "balls"}


@app.errorhandler(404)
def not_found(e):
    return render_template('index.html')

def run():
    app.run(host='0.0.0.0', debug= True)


if __name__ == "__main__":


    run()
