/* istanbul ignore next */ 
const grid = document.getElementById('graph-grid');
/* istanbul ignore next */ 
const gridTransaction = document.getElementById('graph-grid-transaction');

export class InsightViewer {
  constructor(){

  }

  async showCart(type){
    const getMaxLegend = (base, data) => {
      let max = base;
      for(var i=0; i < data.length; i++){
        if(max < data[i].kuantitas){
          max *= ((data[i].kuantitas - max) / 100 == 0 ? 1 : (data[i].kuantitas - max) / base);
        }
      }
      return max;
    }

    if(!type){
      const allSales = await fetch('http://127.0.0.1:5000/get-sales')
        .then((response) => response.json())
        .then((data) => { return data });

      let allSalesBar = '';
      let allSalesLegend = '';
      const maxAllSales = getMaxLegend(100, allSales);
      for (let i = maxAllSales; i > 0; i -= maxAllSales/5) {
        allSalesLegend += `<div class="tick" style="height: 59px;"><p>${i}</p></div>`;
      }
      allSales.forEach((item, i) => { 
        const bar = `
          <tr class="qtr" id="q${i+1}">
            <th scope="row">${item.nama}</th>
            <td class="bar" style="height: ${item.frekuensi / maxAllSales * 300}px;"><p id="detail">${item.frekuensi}</p></td>
          </tr>
        `
        allSalesBar += bar;
      });
      let allSalesContent = `
      <div class="graph-wrapper">
      <table class="graph">
        <caption>5 Produk Terlaris</caption>
          <tbody>
            ${allSalesBar}
          </tbody>
        </table>
        
        <div class="ticks">
          ${allSalesLegend}
        </div>
      </div>
      `
      grid.innerHTML += allSalesContent;
    }else{
      if(type != 'transaction'){
        const data = await fetch('http://127.0.0.1:5000/get-sales?category=' + type)
        .then((response) => response.json())
        .then((data) => { return data });
        let salesBar = '';
        let salesLegend = '';
        const maxAllSales = getMaxLegend(100, data);
        for (let i = maxAllSales; i > 0; i -= maxAllSales/5) {
          salesLegend += `<div class="tick" style="height: 59px;"><p>${i}</p></div>`;
        }
        data.forEach((item, i) => { 
          const bar = `
            <tr class="qtr" id="q${i+1}">
              <th scope="row">${item.nama}</th>
              <td class="bar" style="height: ${item.frekuensi / maxAllSales * 300}px;"><p id="detail">${item.frekuensi}</p></td>
            </tr>
          `
          salesBar += bar;
        });
        let allSalesContent = `
        <div class="graph-wrapper">
        <table class="graph">
          <caption>5 Produk Terlaris Kategori ${type}</caption>
            <tbody>
              ${salesBar}
            </tbody>
          </table>
          
          <div class="ticks">
            ${salesLegend}
          </div>
        </div>
        `
        grid.innerHTML += allSalesContent;
      }else{
      const paymentSales = await fetch('http://127.0.0.1:5000/get-sales-by-payment')
      .then((response) => response.json())
      .then((data) => { return data });

      let paymentSalesBar = '';
      let paymentSalesLegend = '';
      const maxPaymentSales = getMaxLegend(5, paymentSales);
      for (let i = maxPaymentSales; i > 0; i -= maxPaymentSales/5) {
      paymentSalesLegend += `<div class="tick" style="height: 59px;"><p>${i}</p></div>`;
      }
      paymentSales.forEach((item, i) => { 
      const bar = `
        <tr class="qtr" id="q${i+1}">
          <th scope="row">${item.nama}</th>
          <td class="bar" style="height: ${item.frekuensi / maxPaymentSales * 300}px;"><p id="detail">${item.frekuensi}</p></td>
        </tr>
      `
      paymentSalesBar += bar;
      });
      let paymentSalesContent = `
      <div class="graph-wrapper">
      <table class="graph">
      <caption>Metode Pembayaran</caption>
        <tbody>
          ${paymentSalesBar}
        </tbody>
      </table>

      <div class="ticks">
        ${paymentSalesLegend}
      </div>
      </div>
      `
      gridTransaction.innerHTML += paymentSalesContent;
      }
    }
  }
}