/* istanbul ignore next */ 
const modal = document.getElementById('add-modal');
/* istanbul ignore next */ 
const emptyModal = document.getElementById('empty-modal');

export class EditorTransaksiForm {
  constructor(dataTransaksi){
    this.dataTransaksi = dataTransaksi;
  }

  validateForm(){
    const data = this.dataTransaksi;
    return !(!data.total_pembayaran || !data.metode_pembayaran || !data.waktu || data.items.length == 0)
  }

  async sendForm(){
    const validation = this.validateForm();
    if(validation){
      fetch('http://127.0.0.1:5000/add-transaksi', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.dataTransaksi)
    })
      .then(response => response.json())
      .then(response => console.log(modal.style.display = "block"))
    } 
    else emptyModal.style.display = 'block';
  }

}
