import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
  DATABASE_URI = os.environ['DATABASE_URI']
  DATABASE_NAME = os.environ['DATABASE_NAME']
  DATABASE_USER = os.environ['DATABASE_USER']
  DATABASE_PASS = os.environ['DATABASE_PASS']
