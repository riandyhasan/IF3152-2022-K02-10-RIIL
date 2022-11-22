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
    dbconn = sqlite3.connect(database, check_same_thread=False)
    dbconn.row_factory = sqlite3.Row
  except Error as e:
    print("Could not connect to database")
    
  if(mydb.exists()):
    print("Database connected")
    return dbconn
  else:
    return("Database not found")
