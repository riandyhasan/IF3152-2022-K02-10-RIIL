import json

class Produk(object):
  def __init__(self, db, data):
    self.db = db
    self.data = data

  def getAllProduk(self):
    sql = '''SELECT * FROM produk'''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )
  
  def getProduk(self):
    sql = f'''SELECT * FROM produk WHERE id = {self.data}'''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )

  def getEmptyProduk(self):
    sql = '''SELECT * FROM produk WHERE kuantitas = 0'''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )
  
  def getSearchProduk(self):
    sql = f'''SELECT * FROM produk WHERE nama LIKE %{self.data}% '''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )
  
  def getProdukByCategory(self):
    sql = f'''SELECT * FROM produk WHERE kategori = {self.data} '''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )