const addBtn = document.getElementById('add-item');
const formList = document.getElementById('items-list');
const paymentMethond = document.getElementById('metode-pembayaran');
const totalPrice = document.getElementById('total-price');
const submit = document.getElementById('btn-submit');
const modal = document.getElementById("add-modal");
const modalEmpty = document.getElementById("empty-modal");
const okEmpty = document.getElementById("empty-ok");

let formListCount = 1;
var productList = [];
let currentProduct = document.getElementById('product-1');

const productData = await fetch('http://127.0.0.1:5000/get-all-produk')
  .then((response) => response.json())
  .then((data) => { return data });

const formContent = (formListCount) => {return `
  <div class="items-row">
    <div class="form-wrapper name">
      <div class="item-form-label">
        Nama
      </div>  
      <div class="autocomplete" style="width:390px;">
        <input type="text" class="item-form" id="product-${formListCount}" />
      </div>
    </div>

    <div class="form-wrapper">
      <div class="item-form-label">
        Kuantitas
      </div>  
      <div style="display: flex; width: 100%; align-items: center;">
        <div class="plus" id="plus-${formListCount}">+</div>
        <input type="number" class="item-form" value="1" id="kuantitas-${formListCount}" />
        <div class="minus" id="minus-${formListCount}">-</div>
      </div>
    </div>

    <div class="form-wrapper">
      <div class="item-form-label">
        Harga Satuan
      </div>  
      <input type="number" class="item-form" placeholder="0" id="price-${formListCount}" disabled="true" />
    </div>

    <div class="form-wrapper">
      <div class="item-form-label">
        Harga Total
      </div>  
      <input type="number" class="item-form" placeholder="0" id="total-${formListCount}" disabled="true" />
    </div>
  </div>
`}

document.addEventListener('click', e => {
  if(e.target.id.includes('plus-')){
    const id_form = e.target.id.replace('plus-', '');
    const kuantitas = document.getElementById(`kuantitas-${id_form}`);
    const total = document.getElementById(`total-${id_form}`);
    const price = document.getElementById(`price-${id_form}`);
    if(getMaxQuantity(`product-${id_form}`) >= parseInt(kuantitas.value) + 1){
      kuantitas.value = parseInt(kuantitas.value) + 1;
      total.value = parseInt(kuantitas.value) * parseInt(price.value);
      totalPrice.value = parseInt(totalPrice.value) + parseInt(price.value);
      changeKuantitas(parseInt(kuantitas.value), `product-${id_form}`)
    }
  }
  if(e.target.id.includes('minus-')){
    const id_form = e.target.id.replace('minus-', '');
    const kuantitas = document.getElementById(`kuantitas-${id_form}`);
    const total = document.getElementById(`total-${id_form}`);
    const price = document.getElementById(`price-${id_form}`);
    if(kuantitas.value > 1){
      kuantitas.value = parseInt(kuantitas.value) - 1;
      total.value = parseInt(kuantitas.value) * parseInt(price.value);
      totalPrice.value = parseInt(totalPrice.value) - parseInt(price.value);
      changeKuantitas(parseInt(kuantitas.value), `product-${id_form}`)
    }
  }
});

const getMaxQuantity = (product) => {
  let max = 1;
  for (var i=0; i < productList.length; i++) {
    if(productList[i].name === product) max = productList[i].max
  }
  return max;
}


const search = (product) => {
  for (var i=0; i < productData.length; i++) {
    return productData[i].name === product;
  }
  return false;
}

const changeKuantitas = (kuantitas, product) => {
  for (var i=0; i < productList.length; i++) {
    if(productList[i].name === product){
      productList[i].kuantitas = kuantitas;
    }
  }
}

document.addEventListener('input', e => {
  if(e.target.id.includes('product-')){
    const id_form = e.target.id.replace('product-', '');
    const kuantitas = document.getElementById(`kuantitas-${id_form}`);
    const total = document.getElementById(`total-${id_form}`);
    const price = document.getElementById(`price-${id_form}`);
    const temp = parseInt(total.value);
    if((e.target.value == '' || !search(e.target.value)) && total.value){
      kuantitas.value = 1;
      total.value = 0;
      price.value = 0;
      totalPrice.value = parseInt(totalPrice.value) - parseInt(temp);
      productList = productList.filter(item => {
        return item.name !== e.target.id;
      })
    }
  }
  if(e.target.id.includes('kuantitas-')){
    const id_form = e.target.id.replace('kuantitas-', '');
    const kuantitas = document.getElementById(`kuantitas-${id_form}`);
    if(kuantitas.value){
      const max = getMaxQuantity(`product-${id_form}`);
      if(parseInt(kuantitas.value) < 1) kuantitas.value = 1;
      if(max <  parseInt(kuantitas.value))kuantitas.value = max;
      const total = document.getElementById(`total-${id_form}`);
      const price = document.getElementById(`price-${id_form}`);
      const temp = parseInt(total.value);
      total.value = parseInt(kuantitas.value) * parseInt(price.value);
      totalPrice.value = parseInt(totalPrice.value) - temp + parseInt(total.value);
      changeKuantitas(parseInt(kuantitas.value), `product-${id_form}`)
    }
  }
});

document.addEventListener("click", e => {
  if(e.target.id.includes('product-')){
    currentProduct = e.target;
  }
  if(e.target.id.includes('value-')){
    const pId = ((currentProduct.id).split('-'))[1];
    const price = document.getElementById(`price-${pId}`);
    const total = document.getElementById(`total-${pId}`);
    const name = document.getElementById(`product-${pId}`);
    const kuantitas = document.getElementById(`kuantitas-${pId}`);   
    if(total.value) totalPrice.value = parseInt(totalPrice.value) - parseInt(total.value);
    name.value = e.target.getAttribute('nama');
    kuantitas.value = 1;
    price.value = parseInt(e.target.getAttribute('harga'));
    total.value = parseInt(e.target.getAttribute('harga'));
    const max = parseInt(e.target.getAttribute('max'));
    if(totalPrice.value){
      totalPrice.value = parseInt(totalPrice.value) + parseInt(e.target.getAttribute('harga'));
    }else{
      totalPrice.value = parseInt(e.target.getAttribute('harga'));
    }
    productList.push({ name: currentProduct.id, product_id: parseInt(e.target.getAttribute('productId')), kuantitas: parseInt(kuantitas.value), total_harga: parseInt(total.value), max: max });
  }
  if (e.target == modalEmpty) {
    modalEmpty.style.display = "none";
  }
});

okEmpty.addEventListener('click', () => {
  modalEmpty.style.display = "none";
})

addBtn.addEventListener('click', () => {
  formListCount += 1;
  const parent = document.createElement('div');
  parent.innerHTML = formContent(formListCount);
  formList.appendChild(parent);
  autocomplete(document.getElementById(`product-${formListCount}`));
});


const autocomplete = (inp) => {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  const id = inp.id;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", e => {
      var a, b, i;
      var val = inp.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("div");
      a.setAttribute("id", id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      inp.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < productData.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (productData[i].nama.substr(0, val.length).toUpperCase() == val.toUpperCase() && productData[i].kuantitas > 0) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("div");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + productData[i].nama.substr(0, val.length) + "</strong>";
          b.innerHTML += productData[i].nama.substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.setAttribute('id', `value-${productData[i].id}`);
          b.setAttribute('nama', productData[i].nama);
          b.setAttribute('harga', productData[i].harga);
          b.setAttribute('productId', productData[i].id);
          b.setAttribute('max', productData[i].kuantitas);
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", e => {
      var x = document.getElementById(id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });

  const addActive = (x) => {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  const removeActive = (x) => {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  const closeAllLists = (elmnt) => {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", e => {
    closeAllLists(e.target);
  });
}

autocomplete(document.getElementById('product-1'));

submit.addEventListener("click", () => {
  if(productList.length <= 0) {
    modalEmpty.style.display = "block";
  }else{
    const d = new Date();
    const waktu = [ d.getFullYear(),d.getMonth()+1, d.getDate()].join('-')+' '+ [d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
    fetch('http://127.0.0.1:5000/add-transaksi', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ total_pembayaran: parseInt(totalPrice.value), metode_pembayaran: paymentMethond.value, items: productList, waktu: waktu })
  })
    .then(response => response.json())
    .then(response => console.log(response))
    modal.style.display = "block";
  }
});