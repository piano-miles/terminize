const studyset = sessionStorage.getItem("studyset").split('\n').map(_ => _.split('\t'));

let table = document.getElementById("table");

/*

for (const i of studyset)
    table.addRow(i, studyset[i][0], studyset[i][1]) // Add set to table

*/