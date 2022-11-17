const editProduct = document.getElementById('edit-product')
const productName = document.getElementById('nama');
const productCategory = document.getElementById('kategori');
const productPrice = document.getElementById('harga');
const productSupplier = document.getElementById('supplier');
const productPhone = document.getElementById('telp');
const productImage = document.getElementById('product-gambar');
const productQuantity = document.getElementById('kuantitas');
const productSize = document.getElementById('ukuran');


const getProductId = () => {
  const queryString = new URLSearchParams(window.location.search)
  return queryString.get('id')
}

const formatRupiah = (angka) => {
  const prefix = "Rp. ";
  var number_string = angka.toString(),
  split   		= number_string.split(','),
  sisa     		= split[0].length % 3,
  rupiah     		= split[0].substr(0, sisa),
  ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if(ribuan){
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

const productId = getProductId();

editProduct.setAttribute('href', `../Edit/index.html?id=${productId}`);

const productData = await fetch(`http://127.0.0.1:5000/get-produk?id=${productId}`)
  .then((response) => response.json())
  .then((data) => { return data[0] });

productName.innerHTML = productData.nama;
productSize.innerHTML = productData.ukuran;
productCategory.innerHTML = productData.kategori;
productImage.setAttribute('src', productData.gambar);
productPrice.innerHTML = formatRupiah(productData.harga);
productQuantity.innerHTML = productData.kuantitas;
productSupplier.innerHTML = productData.nama_supplier;
productPhone.innerHTML = productData.no_telp_supplier;

