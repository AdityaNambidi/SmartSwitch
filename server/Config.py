import os
from dotenv import load_dotenv

load_dotenv()

class AppConfig:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "sqlite:///database/users.db"
    SECRET_KEY = os.environ["SECRET_KEY"]
    JWT_SECRET_KEY = os.environ["SECRET_KEY"]