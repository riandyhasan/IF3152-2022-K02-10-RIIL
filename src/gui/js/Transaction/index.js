const sort = document.getElementById("sort");
const sort_up = document.getElementById("sort-up");
const sort_down = document.getElementById("sort-down");
const sort_title = document.getElementById("sort-title");
const table = document.getElementById("table-transaksi");
const modal = document.getElementById("modal");
const itemContent = document.getElementById("item-content");
const modalContent = document.getElementById("modal-content");
const header = `
<tr>
    <th>Tanggal</th>
    <th>Metode Pembayaran</th>
    <th>Total</th>
</tr>
`;
let contentNewest = header;
let contentLatest = header;

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

sort.addEventListener('click', () => {
    sort_up.classList.toggle("none")
    sort_down.classList.toggle("none")
    if(sort_down.classList.contains("none")){
        sort_title.innerHTML = "Sort by Latest";
        table.innerHTML = contentLatest;
    }else {
        sort_title.innerHTML = "Sort by Newest";
        table.innerHTML = contentNewest;
    }
  });

const transactionData = await fetch('http://127.0.0.1:5000/get-all-transaksi')
  .then((response) => response.json())
  .then((data) => { return data });

transactionData.forEach((item, i) => {
    const content = `
    <tr key="${i}" class=${i%2 === 1 ? "row-table" : ""} style="cursor: pointer;">
        <td class="item-row col-row-first" id=${item.id}>${item.waktu}</td>
        <td class="item-row" id=${item.id}>${item.metode_pembayaran}</td>
        <td class="item-row col-row-last" id=${item.id}>${formatRupiah(item.total_pembayaran)}</td>
    </tr>
    `;
    table.innerHTML += content;
    contentNewest += content;
});

(transactionData.reverse()).forEach((item, i) => {
    const content = `
    <tr key="${i}" class=${i%2 === 1 ? "row-table" : ""} style="cursor: pointer;">
        <td class="item-row col-row-first" id=${item.id}>${item.waktu}</td>
        <td class="item-row" id=${item.id}>${item.metode_pembayaran}</td>
        <td class="item-row col-row-last" id=${item.id}>${formatRupiah(item.total_pembayaran)}</td>
    </tr>
    `;
    contentLatest += content;
});

const getItemData = async (id) => {
  const data = await fetch(`http://127.0.0.1:5000/get-item-transaksi?id=${id}`)
  .then((response) => response.json())
  .then((data) => { return data });
  return data
}

document.addEventListener('click', async e => {
  if(e.target.classList.contains('item-row') && e.target.getAttribute('id')){
    const modalHeader = `
    <tr>
      <th>Produk</th>
      <th>Kuantitas</th>
      <th>Total Harga</th>
    </tr>
    `;
    itemContent.innerHTML = modalHeader;
    const items = await fetch(`http://127.0.0.1:5000/get-item-transaksi?id=${e.target.getAttribute('id')}`)
    .then((response) => response.json())
    .then((data) => { return data });
    items.forEach((item, i) => {
      const content = `
      <tr key="${i}">
          <td class="item-row col-row-first">${item.nama}</td>
          <td class="item-row">${item.kuantitas}</td>
          <td class="item-row col-row-last">${item.total}</td>
      </tr>
      `;
      itemContent.innerHTML += content;
    })
    modal.style.display = 'block';
  }
  if(e.target == modal || e.target.id == 'ok-modal'){
    modal.style.display = 'none';
    itemContent.innerHTML = '';
  }
})