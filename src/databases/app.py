import database as db
import flask_wrapper as fw
from tables import produk as pd
from flask import Flask

flask_app = Flask(__name__)

app = fw.FlaskAppWrapper(flask_app)
dbconn = db.create_connection()

def get_produk():
    produk = pd.Produk(dbconn, "")
    data = produk.get_all_produk()
    return data

# Add endpoint for the action function
app.add_endpoint('/produk', 'produk', get_produk, methods=['GET'])

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000,debug=True)