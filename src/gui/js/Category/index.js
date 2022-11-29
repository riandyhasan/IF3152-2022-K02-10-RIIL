const searchWrapper = document.getElementById('category-wrapper');
const see_more = document.getElementById('see-more');
const searchLabel  =document.getElementById('category-val')
const IMAGE_PATH = "../../../../../img/product";
let isDown = false;
let startX;
let scrollLeft;

const getQuery = () => {
  const queryString = new URLSearchParams(window.location.search)
  return queryString.get('category')
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
const productData = await fetch(`http://127.0.0.1:5000/get-produk?category=${getQuery()}`)
  .then((response) => response.json())
  .then((data) => { return data });

searchLabel.innerHTML += `"${getQuery()}"`

if(productData.length > 0){
  productData.forEach((item, i) => {
    const content = `
    <a href="../Detail/index.html?id=${item.id}" style="text-decoration: none;">
      <div class="card" key=${i} id="card-${item}"">
      <div class="${parseInt(item.kuantitas) > 0 ? 'none' : ''} habis-container">
          <img src="../../../../../img/habis.png" alt="Stok Habis" class="habis-icon"/>
      </div>
      <div class="card-image ${parseInt(item.kuantitas) > 0 ? '' : 'habis'}">
        <img src="${item.gambar[0] == '/' ? IMAGE_PATH + item.gambar : item.gambar}" />
      </div>
      <div class="card-details">
        <div class="search-name">
        ${item.nama}
        </div>
        <div class="search-size">
        ${item.ukuran}
        </div>
        <div class="search-price">
        ${formatRupiah(item.harga)}
        </div>
      </div>
    </div>
    </a>
    `;
    searchWrapper.innerHTML += content;
  });
}else{
  const search_left = document.getElementById('category-left');
  const search_right = document.getElementById('category-right');
  see_more.classList.add('none');
  search_right.classList.add('none');
  search_left.classList.add('none');
  const content = `
  <div style="display: flex; width: 100%; height: 100%; margin-top: 80px; justify-content: center; align-items: center;">
    <h1 style="max-width: 50%; text-align: center;">Tidak ada produk dengan kata kunci "${getQuery()}"</h1>
  </div>
  `
  searchWrapper.innerHTML += content;
}

const search_left = document.getElementById('category-left');
const search_right = document.getElementById('category-right');

see_more.addEventListener('click', () => {
  if(see_more.innerHTML == 'Show more'){
    see_more.innerHTML = 'Show less';
    searchWrapper.classList.remove('card-wrapper');
    searchWrapper.classList.add('card-wrapper-grid');
    search_right.classList.add('none');
    search_left.classList.add('none');
  }else{
    see_more.innerHTML = 'Show more';
    searchWrapper.classList.remove('card-wrapper-grid');
    searchWrapper.classList.add('card-wrapper');
    search_right.classList.remove('none');
    search_left.classList.remove('none');
  }
});


searchWrapper.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - searchWrapper.offsetLeft;
  scrollLeft = searchWrapper.scrollLeft;
});
searchWrapper.addEventListener('mouseleave', () => {
  isDown = false;
});
searchWrapper.addEventListener('mouseup', () => {
  isDown = false;
});
searchWrapper.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - searchWrapper.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  searchWrapper.scrollLeft = scrollLeft - walk;
});

search_right.addEventListener('click', () => {
  searchWrapper.scrollLeft += 1000;
});

search_left.addEventListener('click', () => {
  searchWrapper.scrollLeft -= 1000;
});