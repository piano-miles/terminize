const studyset = sessionStorage.getItem("studyset").split("\n").map(_ => _.split("\t"));

var table = document.getElementById("table");
var rows = [], cells = [];

for (let i = 0; i < studyset.length; i++) {
    rows.push(table.insertRow(i + 1));

    cells.push([
        rows[i].insertCell(0),
        rows[i].insertCell(1),
        rows[i].insertCell(2)
    ]);
}

for (let i = 0; i < cells.length; i++) {
    cells[i][0].innerHTML = `<p class="num">${i + 1}</p>`;
    cells[i][1].innerHTML = studyset[i][0];
    cells[i][2].innerHTML = studyset[i][1];
}