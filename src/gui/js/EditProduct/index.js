import { EditorProdukForm } from "../Class/EditorProdukForm.js";

const back = document.getElementById('back');
const back_submit = document.getElementById('back-submit')
const cancel = document.getElementById('cancel');
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
const save = document.getElementById('btn-save');
const emptyModal = document.getElementById('empty-modal');
const emptyBtn = document.getElementById('empty-ok');
let currentGambar;

const getProductId = () => {
  const queryString = new URLSearchParams(window.location.search)
  return queryString.get('id')
}

// const formatRupiah = (angka) => {
//   const prefix = "Rp. ";
//   var number_string = angka.replace(/[^,\d]/g, '').toString(),
//   split   		= number_string.split(','),
//   sisa     		= split[0].length % 3,
//   rupiah     		= split[0].substr(0, sisa),
//   ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

//   // tambahkan titik jika yang di input sudah menjadi angka ribuan
//   if(ribuan){
//     separator = sisa ? '.' : '';
//     rupiah += separator + ribuan.join('.');
//   }

//   rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
//   return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
// }

plus_quantity.addEventListener('click', () => {
  productQuantity.value = parseInt(productQuantity.value) + 1;
})

minus_quantity.addEventListener('click', () => {
  if(productQuantity.value <= 0) productQuantity.value = 0;
  else productQuantity.value -= 1;
})

plus_size.addEventListener('click', () => {
  productSize.value = parseInt(productSize.value) + 1;
})

minus_size.addEventListener('click', () => {
  if(productSize.value <= 0) productSize.value = 0;
  else productSize.value -= 1;
})

const productId = getProductId();

productImage.addEventListener('change', e => {
  labelImage.innerHTML = e.target.value.replace(/.*[\/\\]/, '');
})

document.addEventListener('click', e => {
  if(e.target == emptyModal || e.target == emptyBtn){
    emptyModal.style.display = 'none';
  }
});

back.setAttribute('href', `../Detail/index.html?id=${productId}`);
cancel.setAttribute('href', `../Detail/index.html?id=${productId}`);
back_submit.setAttribute('href', `../Detail/index.html?id=${productId}`);

const productData = await fetch(`http://127.0.0.1:5000/get-produk?id=${productId}`)
  .then((response) => response.json())
  .then((data) => { return data[0] });

const sizes = (productData.ukuran).split(' ') 

productName.value = productData.nama;
labelImage.innerHTML = productData.gambar;
currentGambar = productData.gambar;
productSize.value = parseInt(sizes[0]);
productSizeLabel.value = sizes[1];
productCategory.value = productData.kategori;
productPrice.value = productData.harga;
productQuantity.value = productData.kuantitas;
productSupplier.value = productData.nama_supplier;
productPhone.value = ((productData.no_telp_supplier).toString()).replace('62', '0');

const editProduk = async (data) => {
  const editor = new EditorProdukForm(data);
  let formData = new FormData();
  formData.append("id", data.id);
  formData.append("nama", data.nama);
  formData.append("kategori", data.kategori);
  formData.append("ukuran", data.ukuran);
  formData.append("gambar", data.gambar);
  formData.append("harga", data.harga);
  formData.append("supplier", data.supplier);
  formData.append("telp", data.telp);
  formData.append("kuantitas", data.kuantitas);
  formData.append("file", data.file);
  await editor.sendForm('edit', formData);
}

save.addEventListener('click', () => {
  let gambar;
  if(productImage.value){
    gambar = new File([productImage.files[0]], productName.value + "." + productImage.files[0].name.slice((productImage.files[0].name.lastIndexOf(".") - 1 >>> 0) + 2));
  }
  const data = { 
    id: productId,
    nama: productName.value ?? '', 
    kategori: productCategory.value ?? '', 
    ukuran: productSize.value + " " + productSizeLabel.value ?? '',
    harga: parseInt(productPrice.value) ?? '',
    supplier: productSupplier.value ?? '',
    telp: productPhone.value[0] == '0' ? parseInt('62' + productPhone.value.substring(1)) : parseInt(productPhone.value),
    kuantitas: parseInt(productQuantity.value) ?? '',
    gambar: currentGambar,
    file: gambar
  }
  editProduk(data);
});
