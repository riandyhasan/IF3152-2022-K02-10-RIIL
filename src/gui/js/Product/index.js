const wrapper = document.getElementById('product-wrapper');
const category = document.getElementById('category-wrapper');
const see_more_product = document.getElementById('see-more-product');
let isDown = false;
let startX;
let scrollLeft;

const dummy = new Array(20);

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

const productData = await fetch('http://127.0.0.1:5000/get-all-produk')
  .then((response) => response.json())
  .then((data) => { return data });

productData.forEach((item, i) => {
  const content = `
    <a href="./Detail/index.html?id=${item.id}" style="text-decoration: none;">
    <div class="card" key=${i} id="card-item-${item.id}">
    <div class="${parseInt(item.kuantitas) > 0 ? 'none' : ''} habis-container">
      <img src="../../../../img/habis.png" alt="Stok Habis" class="habis-icon"/>
    </div>
    <div class="card-image ${parseInt(item.kuantitas) > 0 ? '' : 'habis'}">
      <img src="${item.gambar}" />
    </div>
    <div class="card-details">
      <div class="product-name">
      ${item.nama}
      </div>
      <div class="product-size">
        ${item.ukuran}
      </div>
      <div class="product-price">
        ${formatRupiah(item.harga)}
      </div>
    </div>
  </div>
  </a>
  `;
  wrapper.innerHTML += content;
});

dummy.forEach((item, i) => {
  const content = `
    <div class="card" key=${i} id="card-${item}"">
    <div class="card-image">
      <img src="https://ik.imagekit.io/z83ycl28q/media/catalog/product/cache/206d6ebf3fdb585a5f4836aede302e61/s/i/single_-_tropicana_slim_minyak_kanola.jpg" />
    </div>
    <div class="category-details">
      <div class="category-name">
        Makanan
      </div>
    </div>
  </div>
  `;
  category.innerHTML += content;
});

const product_left = document.getElementById('product-left');
const product_right = document.getElementById('product-right');
// const maxProductLeft = wrapper.scrollWidth - wrapper.clientWidth;
const category_left = document.getElementById('category-left');
const category_right = document.getElementById('category-right');
// const maxCategoryLeft = category.scrollWidth - category.clientWidth;

see_more_product.addEventListener('click', () => {
  if(see_more_product.innerHTML == 'Show more'){
    see_more_product.innerHTML = 'Show less';
    wrapper.classList.remove('card-wrapper');
    wrapper.classList.add('card-wrapper-grid');
    product_right.classList.add('none');
    product_left.classList.add('none');
  }else{
    see_more_product.innerHTML = 'Show more';
    wrapper.classList.remove('card-wrapper-grid');
    wrapper.classList.add('card-wrapper');
    product_right.classList.remove('none');
    product_left.classList.remove('none');
  }
});

wrapper.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
});
wrapper.addEventListener('mouseleave', () => {
  isDown = false;
});
wrapper.addEventListener('mouseup', () => {
  isDown = false;
});
wrapper.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - wrapper.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  wrapper.scrollLeft = scrollLeft - walk;
});

category.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - category.offsetLeft;
  scrollLeft = category.scrollLeft;
});
category.addEventListener('mouseleave', () => {
  isDown = false;
});
category.addEventListener('mouseup', () => {
  isDown = false;
});
category.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - category.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  category.scrollLeft = scrollLeft - walk;
});

product_right.addEventListener('click', () => {
  wrapper.scrollLeft += 1000;
});

product_left.addEventListener('click', () => {
  wrapper.scrollLeft -= 1000;
});

category_right.addEventListener('click', () => {
  category.scrollLeft += 1000;
});

category_left.addEventListener('click', () => {
  category.scrollLeft -= 1000;
});