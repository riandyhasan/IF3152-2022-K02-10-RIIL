import json

class Transaksi(object):
  def __init__(self, db, data):
    self.db = db
    self.data = data

  def getAllTransaksi(self):
    sql = '''SELECT * FROM riwayat_transaksi ORDER BY waktu DESC'''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )
  
  def addTransaksi(self):
    cur = self.db.cursor()
    sql = '''SELECT id FROM riwayat_transaksi ORDER BY id DESC LIMIT 1'''
    test = (cur.execute(sql)).fetchall()
    tId = 0
    for i in test:
      temp = dict(i)
      tId = temp['id']
    sql = f'''INSERT INTO riwayat_transaksi (id, waktu, total_pembayaran, metode_pembayaran)
              VALUES ({tId+1}, '{self.data['waktu']}', {self.data['total_pembayaran']}, '{self.data['metode_pembayaran']}')'''
    cur.execute(sql)
    self.db.commit()
    return tId