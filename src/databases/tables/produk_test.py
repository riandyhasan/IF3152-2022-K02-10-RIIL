import json
import os, sys
dir_path = os.path.dirname(os.path.realpath(__file__))
parent_dir_path = os.path.abspath(os.path.join(dir_path, os.pardir))
sys.path.insert(0, parent_dir_path)
from produk import Produk
import database as db
dbconn = db.create_connection()

def test_getAllProduks():
    produk = Produk(dbconn, "")
    data = json.loads(produk.getAllProduk())
    assert type(data) is list

def test_getProduk():
    produk = Produk(dbconn, 1)
    data = json.loads(produk.getProduk())
    assert type(data) is list

def test_getEmptyProduk():
    produk = Produk(dbconn, 1)
    data = json.loads(produk.getEmptyProduk())
    assert type(data) is list

def test_getSearchProduk():
    produk = Produk(dbconn, "Mie")
    data = json.loads(produk.getSearchProduk())
    assert type(data) is list

def test_getProdukByCategory():
    produk = Produk(dbconn, "Makanan")
    data = json.loads(produk.getProdukByCategory())
    assert type(data) is list

def test_getAllProdukSales():
    produk = Produk(dbconn, "")
    data = json.loads(produk.getAllProdukSales())
    assert type(data) is list

def test_getProdukSalesByCategory():
    produk = Produk(dbconn, "Minuman")
    data = json.loads(produk.getProdukSalesByCategory())
    assert type(data) is list