const addModal = document.getElementById('add-modal');
const editModal = document.getElementById('edit-modal');
const emptyModal = document.getElementById('empty-modal');

export class EditorProdukForm {
  constructor(dataProduk){
    this.dataProduk = dataProduk;
  }

  validateForm(){
    const data = this.dataProduk;
    return !(!data.nama || !data.kategori || !data.ukuran || !data.gambar || !data.harga || !data.supplier || !data.telp || !data.kuantitas)
  }

  async sendForm(query, formData){
    const validation = this.validateForm();
    if(validation){
      if(query == 'add') {
        await fetch('http://127.0.0.1:5000/add-produk', {
        method: "POST",
        headers: {
          'Host': 'http://127.0.0.1:5000',
          'Origin': 'http://127.0.0.1:5500/',
        },
        body: formData})
        .then(response => response.json())
        .then(response => addModal.style.display = "block")
      }else{
        await fetch('http://127.0.0.1:5000/edit-produk', {
          method: "PUT",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Host': 'http://127.0.0.1:5000',
            'Origin': 'http://127.0.0.1:5500/',
          },
          body: JSON.stringify(this.dataProduk)
        })
        .then(response => response.json())
        .then(() => editModal.style.display = "block")
      }
    } 
    else emptyModal.style.display = 'block';
  }

}