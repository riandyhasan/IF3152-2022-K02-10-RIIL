import sqlite3
from sqlite3 import Error

import os
from pathlib import Path

def create_connection():
  root = os.path.dirname(os.path.realpath(__file__))
  database = os.path.join(root, 'riil.db')
  mydb = Path(root + '/riil.db')

  dbconn = None

  try:
    dbconn = sqlite3.connect(database)
  except Error as e:
    print("Could not connect to database")
  
  if(mydb.exists()):
    return dbconn
  else:
    return("Database not found")