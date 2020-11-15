/**
 * AddTable: Menambahkan tabel pada div dengan ID="SimTable"
 * Semua
 * @param {object} doc Object dari pencarian
 * @param {vector} query vektor dari query yang diinput
 * @param {vector} term vektor dari term yang akan digunakan
 */
function addTable(doc, query, term) => {
  // Inisialisasi tabel
  let myTableDiv = document.getElementById('SimTable');

  let table = document.createElement('TABLE');
  table.border = '1';

  let tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  let tr = document.createElement('TR');
  tableBody.appendChild(tr);

  //Header
  tr = document.createElement('TR');
  tableBody.appendChild(tr);
  for (let j = 0; j < doc.length + 2; j++) {
    let td = document.createElement('TD');
    td.width = '75';
    if (j > 1) {
      td.appendChild(document.createTextNode(doc[j - 2].title));
      tr.appendChild(td);
    } else if (j == 1) {
      td.appendChild(document.createTextNode('Query'));
      tr.appendChild(td);
    } else {
      td.appendChild(document.createTextNode('Term'));
      tr.appendChild(td);
    }
  }

  //content
  for (let i = 0; i < term.length; i++) {
    let tr = document.createElement('TR');
    tableBody.appendChild(tr);

    for (let j = 0; j < doc.length + 2; j++) {
      if (j == 0) {
        let td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode(term[i]));
        tr.appendChild(td);
      } else if (j == 1) {
        let td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode(query[i]));
        tr.appendChild(td);
      } else {
        let td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode(doc[j - 2].amount[i]));
        tr.appendChild(td);
      }
    }
  }
  myTableDiv.appendChild(table);
};
