import database as db
import flask_wrapper as fw
from tables import produk as pd
from flask import Flask, request
from flask_cors import CORS

flask_app = Flask(__name__)
CORS(flask_app)
app = fw.FlaskAppWrapper(flask_app)
dbconn = db.create_connection()

def get_all_produk():
    produk = pd.Produk(dbconn, "")
    data = produk.get_all_produk()
    return data

def get_produk():
    id_produk = request.args.get('id')
    produk = pd.Produk(dbconn, id_produk)
    data = produk.get_produk()
    return data

# Add endpoint for the action function
app.add_endpoint('/get-all-produk', 'get-all-produk', get_all_produk, methods=['GET'])
app.add_endpoint('/get-produk', 'get-produk', get_produk, methods=['GET'])

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000,debug=True)