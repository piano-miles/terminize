const study_set = sessionStorage.getItem("study_set").split("\n").map(_ => _.split("\t"));

let table = document.getElementById("table");
let rows = [], cells = [];

for (let i = 0; i < study_set.length; i++) {
    rows.push(table.insertRow(i + 1));

    cells.push([
        rows[i].insertCell(0),
        rows[i].insertCell(1),
        rows[i].insertCell(2)
    ]);
}

for (let i = 0; i < cells.length; i++) {
    cells[i][0].innerHTML = `<p class="num">${i + 1}</p>`;
    cells[i][1].innerHTML = study_set[i][0];
    cells[i][2].innerHTML = study_set[i][1];
}
