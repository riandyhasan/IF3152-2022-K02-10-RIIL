import json
import os, sys
dir_path = os.path.dirname(os.path.realpath(__file__))
parent_dir_path = os.path.abspath(os.path.join(dir_path, os.pardir))
sys.path.insert(0, parent_dir_path)
from transaksi import Transaksi
import database as db
dbconn = db.create_connection()

def test_getAllItemTransaksi():
    transaksi = Transaksi(dbconn, "")
    data = json.loads(transaksi.getAllTransaksi())
    assert type(data) is list

def test_getTransaksiByMetodePembayaran():
  transaksi = Transaksi(dbconn, "Cash")
  data = json.loads(transaksi.getTransaksiByMetodePembayaran())
  assert type(data) is list