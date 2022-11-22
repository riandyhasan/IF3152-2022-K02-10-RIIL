import { EditorProdukForm } from '../Class/EditorProdukForm.js';

const productName = document.getElementById('nama');
const productCategory = document.getElementById('kategori');
const productPrice = document.getElementById('harga');
const productSupplier = document.getElementById('supplier');
const productPhone = document.getElementById('telp');
const productImage = document.getElementById('product-gambar');
const labelImage = document.getElementById('label-gambar');
const productQuantity = document.getElementById('kuantitas');
const plus_quantity = document.getElementById('plus-kuantitas');
const minus_quantity = document.getElementById('minus-kuantitas');
const productSize = document.getElementById('ukuran');
const productSizeLabel = document.getElementById('ukuran-label')
const plus_size = document.getElementById('plus-size');
const minus_size = document.getElementById('minus-size');
const btnSubmit = document.getElementById('btn-submit');
const emptyModal = document.getElementById('empty-modal');
const emptyBtn = document.getElementById('empty-ok');

plus_quantity.addEventListener('click', () => {
  productQuantity.value = parseInt(productQuantity.value) + 1;
});

minus_quantity.addEventListener('click', () => {
  if(productQuantity.value <= 0) productQuantity.value = 0;
  else productQuantity.value -= 1;
});

plus_size.addEventListener('click', () => {
  productSize.value = parseInt(productSize.value) + 1;
});

minus_size.addEventListener('click', () => {
  if(productSize.value <= 0) productSize.value = 0;
  else productSize.value -= 1;
});

productImage.addEventListener('change', e => {
  labelImage.innerHTML = e.target.value.replace(/.*[\/\\]/, '');
});

document.addEventListener('click', e => {
  if(e.target == emptyModal || e.target == emptyBtn){
    emptyModal.style.display = 'none';
  }
});

const sendProduct = async (data) => {
  const editor = new EditorProdukForm(data);
  let formData = new FormData();
  formData.append("nama", productName.value);
  formData.append("kategori", productCategory.value);
  formData.append("ukuran", productSize.value + " " + productSizeLabel.value);
  formData.append("gambar", data.gambar);
  formData.append("harga", parseInt(productPrice.value));
  formData.append("supplier", productSupplier.value);
  formData.append("telp", productPhone.value[0] == '0' ? parseInt('62' + productPhone.value.substring(1)) : parseInt(productPhone.value));
  formData.append("kuantitas", parseInt(productQuantity.value));
  await editor.sendForm('add', formData);
}

btnSubmit.addEventListener('click', () => {
  let gambar;
  if(productImage.value){
    gambar = new File([productImage.files[0]], productName.value + "." + productImage.files[0].name.slice((productImage.files[0].name.lastIndexOf(".") - 1 >>> 0) + 2));
  }
  const data = { 
    nama: productName.value ?? '', 
    kategori: productCategory.value ?? '', 
    ukuran: productSize.value + " " + productSizeLabel.value ?? '',
    harga: parseInt(productPrice.value) ?? '',
    supplier: productSupplier.value ?? '',
    telp: productPhone.value[0] == '0' ? parseInt('62' + productPhone.value.substring(1)) : parseInt(productPhone.value),
    kuantitas: parseInt(productQuantity.value) ?? '',
    gambar: gambar,
  }
  // for ( var key in data ) {
  //   formData.append(key, data[key]);
  // }

  // console.log(formData.get("nama"))
  sendProduct(data);
})