import os
import database as db
import flask_wrapper as fw
from tables import produk as pd
from tables import transaksi as ts
from tables import item_transaksi as it
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '../../img/product'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

flask_app = Flask(__name__)
CORS(flask_app)
cors = CORS(flask_app, resource={
    r"/*":{
        "origins":"*"
    }
})
app = fw.FlaskAppWrapper(flask_app)
dbconn = db.create_connection()

def get_all_produk():
    produk = pd.Produk(dbconn, "")
    data = produk.getAllProduk()
    return data

def get_produk():
    id_produk = request.args.get('id')
    produk = pd.Produk(dbconn, id_produk)
    data = produk.getProduk()
    return data

def get_all_transaksi():
    transaksi = ts.Transaksi(dbconn, "")
    data = transaksi.getAllTransaksi()
    return data

def add_product():
    file = request.files['file']
    nama = request.form['nama']
    filename = secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_FOLDER, filename))
    gambar = '/' + filename
    harga = request.form['harga']
    kategori = request.form['kategori']
    ukuran = request.form['ukuran']
    supplier = request.form['supplier']
    telp = request.form['telp']
    kuantitas = request.form['kuantitas']
    data_produk = { 'nama': nama, 'gambar': gambar, 'harga': harga, 'kategori': kategori, 'ukuran': ukuran, 'supplier': supplier, 'telp': telp, 'kuantitas': kuantitas }
    produk = pd.Produk(dbconn, data_produk)
    produk.addProduk()
    return jsonify('Berhasil menambahkan produk')

def add_transaksi():
    # try:
    data = dict(request.json)
    data_transaksi = { 'total_pembayaran': data['total_pembayaran'], 'metode_pembayaran': data['metode_pembayaran'], 'waktu': data['waktu'] }
    transaksi = ts.Transaksi(dbconn, data_transaksi)
    transaksi_id = transaksi.addTransaksi()
    for item in data['items']:
        item = dict(item)
        data_produk = { 'id': item['product_id'], 'kuantitas': item['kuantitas'] }
        produk = pd.Produk(dbconn, data_produk)
        produk.kurangKuantitasProduk()
        data_item = { 'produk': item['product_id'], 'transaksi': transaksi_id, 'kuantitas': item['kuantitas'], 'total_harga': item['total_harga'] }
        item_transaksi = it.ItemTransaksi(dbconn, data_item)
        item_transaksi.addItemTransaksi()
    # except Exception as error:
    #     return jsonify({'error': error})
    return jsonify('Berhasil menambahkan transaksi')

# Add endpoint for the action function
app.add_endpoint('/get-all-produk', 'get-all-produk', get_all_produk, methods=['GET'])
app.add_endpoint('/get-produk', 'get-produk', get_produk, methods=['GET'])
app.add_endpoint('/get-all-transaksi', 'get-all-transaksi', get_all_transaksi, methods=['GET'])
app.add_endpoint('/add-produk', 'add-product', add_product, methods=['POST'])
app.add_endpoint('/add-transaksi', 'add-transaksi', add_transaksi, methods=['POST'])

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000,debug=True)