import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

class AppConfig:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "sqlite:///database/database.db"
    SECRET_KEY = os.environ["SECRET_KEY"]
    JWT_SECRET_KEY = os.environ["SECRET_KEY"]
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=168)