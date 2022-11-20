const searchWrapper = document.getElementById('search-wrapper');
const see_more = document.getElementById('see-more');
const IMAGE_PATH = "../../../../../img/product";
let isDown = false;
let startX;
let scrollLeft;

const dummy = [...Array(20).keys()];

dummy.forEach((item, i) => {
  const content = `
    <div class="card" key=${i} id="card-${item}"">
    <div class="${i%2 == 0 ? 'hidden' : ''} habis-container">
        <img src="../../../../../img/habis.png" alt="Stok Habis" class="habis-icon"/>
    </div>
    <div class="card-image ${i%2 == 0 ? '' : 'habis'}">
      <img src="https://ik.imagekit.io/z83ycl28q/media/catalog/product/cache/206d6ebf3fdb585a5f4836aede302e61/s/i/single_-_tropicana_slim_minyak_kanola.jpg" />
    </div>
    <div class="card-details">
      <div class="search-name">
        Minyak Goreng Tropicana Slim Minyak Goreng Tropicana Slim Minyak Goreng Tropicana Slim
      </div>
      <div class="search-size">
        2L
      </div>
      <div class="search-price">
        Rp24.000,00
      </div>
    </div>
  </div>
  `;
  searchWrapper.innerHTML += content;
});

const search_left = document.getElementById('search-left');
const search_right = document.getElementById('search-right');

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