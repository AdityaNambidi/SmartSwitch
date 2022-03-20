import smtplib
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv
import random
import time

load_dotenv()

gmail = os.environ["EMAIL"]
pwd = os.environ["EMAIL_PWD"]
subject = 'SmartSwitch Account OTP'

def sendEmail(email, otp):

    body = """
    Hello,

    Here is your OTP for creating your SmartSwitch account:  """ + otp + """.
    
    This OTP will expire within 1 minute."""
    
    msg = MIMEText(body)

    msg["Subject" ] = subject   
    msg["From"] = gmail
    msg["To"] = email

    try:
        smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        smtp_server.ehlo()
        smtp_server.login(gmail, pwd)
        smtp_server.sendmail(gmail, email, msg.as_string())
        smtp_server.close()
        print ("Email sent successfully!")

        return "ok"

    except Exception as ex:
        print ("Something went wrong….",ex)
        return "Something went wrong" 
        
def generateOTP():
    otp = random.randint(100000, 999999)
    return otp

def otpLoop(db, User, email, app):

    start = time.time()

    while True:
        
        if time.time() - start >= 60:
            print("time up")

            with app.app_context():
                confirmed =  User.query.filter_by( email= email).all()[0].emailConfirmed

                if confirmed == 0:
                    db.session.delete( User.query.filter_by( email= email ).one() )
                    db.session.commit()
                    print("User not confirmed")

            break