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
    sql = f'''SELECT * FROM produk WHERE nama LIKE '%{self.data}%' '''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )
  
  def getProdukByCategory(self):
    sql = f'''SELECT * FROM produk WHERE kategori = '{self.data}' '''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )

  def getAllProdukSales(self):
    sql = f'''SELECT * FROM(SELECT nama, SUM(item_transaksi.kuantitas) as frekuensi 
              FROM item_transaksi
              JOIN produk
              ON produk.id = item_transaksi.produk
              GROUP BY item_transaksi.produk 
              ORDER BY frekuensi
              LIMIT 5)
              ORDER BY nama
              '''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )

  def getProdukSalesByCategory(self):
    sql = f'''SELECT * FROM(SELECT nama, SUM(item_transaksi.kuantitas) as frekuensi 
              FROM item_transaksi
              JOIN produk
              ON produk.id = item_transaksi.produk
              WHERE kategori = '{self.data}'
              GROUP BY item_transaksi.produk 
              ORDER BY frekuensi
              LIMIT 5)
              ORDER BY nama
              '''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    return json.dumps( [dict(i) for i in rows] )

  def tambahKuantitasProduk(self):
    sql = f'''UPDATE produk
              SET kuantitas = kuantitas + {self.data['kuantitas']}
              WHERE id = {self.data['id']}; '''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    self.db.commit()
    return json.dumps( [dict(i) for i in rows] )
  
  def kurangKuantitasProduk(self):
    sql = f'''UPDATE produk
              SET kuantitas = kuantitas - {self.data['kuantitas']}
              WHERE id = {self.data['id']}; '''
    cur = self.db.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    self.db.commit()
    return json.dumps( [dict(i) for i in rows] )

  def addProduk(self):
    cur = self.db.cursor()
    sql = '''SELECT id FROM produk ORDER BY id DESC LIMIT 1'''
    test = (cur.execute(sql)).fetchall()
    pId = 0
    for i in test:
      temp = dict(i)
      pId = temp['id']
    sql = f'''INSERT INTO produk (id, nama, harga, gambar, kategori, ukuran, nama_supplier, no_telp_supplier, kuantitas)
              VALUES ({pId+1}, '{self.data['nama']}', {self.data['harga']}, '{self.data['gambar']}', '{self.data['kategori']}', '{self.data['ukuran']}', '{self.data['supplier']}', {self.data['telp']}, {self.data['kuantitas']});'''
    cur.execute(sql)
    self.db.commit()
    return pId
  
  def editProduk(self):
    cur = self.db.cursor()
    sql = f'''UPDATE produk
            SET nama = '{self.data['nama']}', 
            harga = {self.data['harga']},
            gambar = '{self.data['gambar']}',
            kategori = '{self.data['kategori']}',
            ukuran = '{self.data['ukuran']}',
            nama_supplier = '{self.data['supplier']}',
            no_telp_supplier = {self.data['telp']},
            kuantitas = {self.data['kuantitas']}
            WHERE id = {self.data['id']}'''
    cur.execute(sql)
    self.db.commit()
    return self.data['id']
  
  def deleteProduk(self):
    cur = self.db.cursor()
    sql = f''' DELETE FROM produk WHERE id = {self.data} '''
    cur.execute(sql)
    self.db.commit()
    return self.data