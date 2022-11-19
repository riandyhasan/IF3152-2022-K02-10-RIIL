const sort = document.getElementById("sort");
const sort_up = document.getElementById("sort-up");
const sort_down = document.getElementById("sort-down");
const sort_title = document.getElementById("sort-title");
const table = document.getElementById("table-transaksi");
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
    <tr key="${i}" class=${i%2 === 1 ? "row-table" : ""}>
        <td class="item-row col-row-first">${item.waktu}</td>
        <td class="item-row">${item.metode_pembayaran}</td>
        <td class="item-row col-row-last">${formatRupiah(item.total_pembayaran)}</td>
    </tr>
    `;
    table.innerHTML += content;
    contentNewest += content;
});

(transactionData.reverse()).forEach((item, i) => {
    const content = `
    <tr key="${i}" class=${i%2 === 1 ? "row-table" : ""}>
        <td class="item-row col-row-first">${item.waktu}</td>
        <td class="item-row">${item.metode_pembayaran}</td>
        <td class="item-row col-row-last">${formatRupiah(item.total_pembayaran)}</td>
    </tr>
    `;
    contentLatest += content;
});