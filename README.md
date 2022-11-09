# Real-time Inventory Information Log
Real-time Inventory Information Log (RIIL) adalah sebuah aplikasi perangkat lunak pada desktop yang berfungsi untuk membantu penjaga toko kelontong untuk mengetahui informasi mengenai produk yang dijual serta melakukan pencatatan transaksi penjualan.

## Tech Stack

- [Electron](https://www.electronjs.org/docs/latest)
- [Python sqlite3](https://docs.python.org/3/library/sqlite3.html)
- [Python Flask](https://flask.palletsprojects.com/en/2.2.x/)

## Setup and Installation

1. Clone repository
```
git clone "url"
```
2. Install dependencies untuk nodejs
```
npm i
```
3. Buat virtual env Python
```
python -m venv env
```
4. Aktifkan virtual env python
```
./env/Scripts/activate
```
5. Install Python depedencies
```
pip3 install -r requirements.txt
6. Jalankan aplikasi
```
npm start
```

## Branching
Setiap membuat branch baru harus ambil base dari `master`. Untuk penamaan branch mengikuti format berikut.
Format branch: `<name>/feature/<title>`
Contoh: vixell-keren/feature/add-product
Penamaan menggunakan kebab case

## Pull Request and Commit Messages
Dalam melakukan commit message mengikuti format berikut.
Format commit message: `<type>: <message>`
Untuk type mengikuti semantic berikut.
- `feature`: (menambahkan fitur baru)
- `fix`: (melakukan bug fix)
- `style`: (melakukan formatting pada code, tidak ada perubahan pada aplikasi)
- `refactor`: (melakukan refactor)
- `test`: (menambahkan test)
- `doc`: (menambahkan dokumentasi atau file assets)
Contoh: feature: menambahkan user interface pada halaman Login
        test: menambahkan test pada class Auth

Setiap merge request harus di-review oleh minimal 1 anggota (selain yang membuat merge request) dari kelompok tersebut. Setelah melakukan code review, berikan comment ataupun like sebagai bukti.