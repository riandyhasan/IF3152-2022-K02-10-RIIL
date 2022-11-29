/* istanbul ignore next */ 
const addModal = document.getElementById('add-modal');
/* istanbul ignore next */ 
const editModal = document.getElementById('edit-modal');
/* istanbul ignore next */ 
const emptyModal = document.getElementById('empty-modal');

export class EditorProdukForm {
  constructor(dataProduk){
    this.dataProduk = dataProduk;
  }

  validateForm(){
    const data = this.dataProduk;
    return !(!data.nama || !data.kategori || !data.ukuran || !data.gambar || !data.harga || !data.supplier || !data.telp || data.kuantitas < 0)
  }

  async sendForm(query, formData){
    const validation = this.validateForm();
    if(validation){
      if(query == 'add') {
        await fetch('http://127.0.0.1:5000/add-produk', {
        method: "POST",
        body: formData})
        .then(response => response.json())
        .then(response => addModal.style.display = "block")
      }else{
        await fetch('http://127.0.0.1:5000/edit-produk', {
          method: "PUT",
          body: formData})
        .then(response => response.json())
        .then(() => editModal.style.display = "block")
      }
    } 
    else emptyModal.style.display = 'block';
  }

}
