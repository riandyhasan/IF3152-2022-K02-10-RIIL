import { InsightViewer } from "../Class/InsightViewer.js";

const grid = document.getElementById('graph-grid');
// const gridTransaction = document.getElementById('graph-grid-transaction');
const see_more = document.getElementById('see-more')
const CATEGORY = ["Makanan", "Minuman", "Sembako", "Produk Kecantikan", "Alat Mandi"];
document.addEventListener('mouseover', e => {
  if(e.target.classList.value === 'bar'){
    e.target.firstChild.style.display = 'block';
  }
});

document.addEventListener('mouseout', e => {
  if(e.target.classList.value === 'bar'){
    e.target.firstChild.style.display = 'none';
  }
});

const insightAll =  new InsightViewer();
insightAll.showCart()


CATEGORY.forEach((item) => {
  const insightCategory = new InsightViewer();
  insightCategory.showCart(item);
});

const insightTrasaction = new InsightViewer();
insightTrasaction.showCart('transaction');

see_more.addEventListener('click', () => {
  if(see_more.innerHTML == 'Show more'){
    see_more.innerHTML = 'Show less';
    grid.classList.remove('hide');
  }else{
    see_more.innerHTML = 'Show more';
    grid.classList.add('hide');
  }
});
