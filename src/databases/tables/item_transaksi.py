import json

class ItemTransaksi(object):
  def __init__(self, db, data):
    self.db = db
    self.data = data

  def getAllItemTransaksi(self):
    sql = '''SELECT * FROM item_transaksi'''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )
  
  def getItemTransaksi(self):
    sql = f'''SELECT * FROM item_transaksi WHERE transaksi = {self.data}'''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )
  
  def addItemTransaksi(self):
    cur = self.db.cursor()
    sql = '''SELECT id from item_transaksi ORDER BY id DESC LIMIT 1'''
    test = (cur.execute(sql)).fetchall()
    iId = 0
    for i in test:
      temp = dict(i)
      iId = temp['id']
    sql = f'''INSERT INTO item_transaksi (id, produk, transaksi, kuantitas, total_harga)
              VALUES ({iId+1}, {self.data['produk']}, {self.data['transaksi']}, {self.data['kuantitas']}, {self.data['total_harga']});'''
    cur.execute(sql)
    rows = cur.fetchall()
    self.db.commit()
    return iId