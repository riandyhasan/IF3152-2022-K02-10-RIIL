import json
import os, sys
dir_path = os.path.dirname(os.path.realpath(__file__))
parent_dir_path = os.path.abspath(os.path.join(dir_path, os.pardir))
sys.path.insert(0, parent_dir_path)
from item_transaksi import ItemTransaksi
import database as db
dbconn = db.create_connection()

def test_getAllItemTransaksi():
    it = ItemTransaksi(dbconn, "")
    data = json.loads(it.getAllItemTransaksi())
    assert type(data) is list


def test_getItemTransaksi():
    it = ItemTransaksi(dbconn, 1)
    data = json.loads(it.getItemTransaksi())
    assert type(data) is list