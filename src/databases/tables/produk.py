import json

class Produk(object):
  def __init__(self, db, data):
    self.db = db
    self.data = data

  def get_all_produk(self):
    sql = '''SELECT * FROM produk'''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )
  
  def get_produk(self):
    sql = f'''SELECT * FROM produk WHERE id = {self.data}'''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )