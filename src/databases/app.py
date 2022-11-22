import os
import database as db
from tables import produk as pd
from tables import transaksi as ts
from tables import item_transaksi as it
from flask import Flask, request, jsonify, send_from_directory, make_response
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from PIL import Image
import json

UPLOAD_FOLDER = '../../img/product'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__, instance_relative_config=True)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
dbconn = db.create_connection()

# Add endpoint for the action function
@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization')
    response.status=200
    return response

@app.route('/get-all-produk', methods=['GET'])
@cross_origin()
def get_all_produk():
    produk = pd.Produk(dbconn, "")
    data = produk.getAllProduk()
    return data

@app.route("/get-produk", methods=['GET'])
@cross_origin()
def get_produk():
    id_produk = request.args.get('id')
    query = request.args.get('q')
    kategori = request.args.get('category')
    data = {}
    if id_produk:
        produk = pd.Produk(dbconn, id_produk)
        data = produk.getProduk()
    elif query:
        produk = pd.Produk(dbconn, query)
        data = produk.getSearchProduk()
    elif kategori:
        produk = pd.Produk(dbconn, kategori)
        data = produk.getProdukByCategory()
    return data
    
@app.route("/get-item-transaksi", methods=['GET'])
@cross_origin()
def get_transaksi():
    id_transaksi = request.args.get('id')
    data = []
    if id_transaksi:
        transaksi = it.ItemTransaksi(dbconn, id_transaksi)
        transaksi_data = json.loads(transaksi.getItemTransaksi())
        for td in transaksi_data:
            produk = pd.Produk(dbconn, td['produk'])
            produk_data = json.loads(produk.getProduk())[0]
            nama = produk_data['nama']
            temp = { "nama": nama, "kuantitas": td["kuantitas"], "total": td["total_harga"] }
            data.append(temp)
    return data

@app.route("/get-all-transaksi", methods=['GET'])
@cross_origin()
def get_all_transaksi():
    transaksi = ts.Transaksi(dbconn, "")
    data = transaksi.getAllTransaksi()
    return data

@app.route("/add-produk", methods=["POST", "OPTIONS"])
@cross_origin()
def add_product():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        file = request.files['gambar']
    if file and request.form:
        filename = secure_filename(file.filename)
        image = Image.open(file)
        image.save('./img/product/' + filename)
        data = dict(request.form)
        nama = data['nama']
        gambar = '/' + filename
        harga = data['harga']
        kategori = data['kategori']
        ukuran = data['ukuran']
        supplier = data['supplier']
        telp = data['telp']
        kuantitas = data['kuantitas']
        data_produk = { 'nama': nama, 'gambar': gambar, 'harga': harga, 'kategori': kategori, 'ukuran': ukuran, 'supplier': supplier, 'telp': telp, 'kuantitas': kuantitas }
        produk = pd.Produk(dbconn, data_produk)
        produk.addProduk()
    return jsonify("Berhasil menambahkan produk")

@app.route("/add-transaksi", methods=["POST", "OPTIONS"])
@cross_origin()
def add_transaksi():
    # try:
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == 'POST':
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

@app.route("/edit-produk", methods=['PUT', "OPTIONS"])
@cross_origin()
def edit_produk():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == 'PUT':
        data = dict(request.json)
        id_produk = data['id']
        nama = data['nama']
        gambar = data['gambar']
        harga = data['harga']
        kategori = data['kategori']
        ukuran = data['ukuran']
        supplier = data['supplier']
        telp = data['telp']
        kuantitas = data['kuantitas']
        data_produk = { 'id':id_produk, 'nama': nama, 'gambar': gambar, 'harga': harga, 'kategori': kategori, 'ukuran': ukuran, 'supplier': supplier, 'telp': telp, 'kuantitas': kuantitas }
        produk = pd.Produk(dbconn, data_produk)
        produk.editProduk()
        return jsonify("Berhasil mengedit produk")

@app.route("/delete-produk", methods=["DELETE"])
@cross_origin()
def delete_produk():
    if request.method == "DELETE":
        id_produk = request.args.get('id')
        produk = pd.Produk(dbconn, id_produk)
        produk.deleteProduk()
        return jsonify("Berhasil menghapus produk")

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000,debug=True,threaded=False)