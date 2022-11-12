const wrapper = document.getElementById('product-wrapper');
const category = document.getElementById('category-wrapper');
let isDown = false;
let startX;
let scrollLeft;

const dummy = [...Array(20).keys()];

dummy.forEach((item, i) => {
  const content = `
    <div class="card" key=${i} id="card-${item}"">
    <div class="card-image">
      <img src="https://ik.imagekit.io/z83ycl28q/media/catalog/product/cache/206d6ebf3fdb585a5f4836aede302e61/s/i/single_-_tropicana_slim_minyak_kanola.jpg" />
    </div>
    <div class="card-details">
      <div class="product-name">
        Minyak Goreng Tropicana Slim Minyak Goreng Tropicana Slim Minyak Goreng Tropicana Slim
      </div>
      <div class="product-size">
        2L
      </div>
      <div class="product-price">
        Rp24.000,00
      </div>
    </div>
  </div>
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