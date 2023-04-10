const myForm = document.getElementById("import");
const csvFile = document.getElementById("studyset");
var studyset = "";

function validate(S) {
    let A = true;
    for (const i of S) A = A && i.length == 2;
    if (!A) {
        document.write(`Your study set is invalid. Please ensure your study set separates each term and corresponding definition with a tab, and each term-definition pair with a new line.`);
        setTimeout(() => location.reload(), 2000);
    } else {
        sessionStorage.setItem("studyset", studyset);
        document.write(`Your set with ${S.length} terms has been validated. You will be redirected shortly.`);
        // logset(S);
        setTimeout(() => window.location.replace("../study"), 2000);
    }
}

logset = _ => { for (card of _) console.log(`studyset: ${card}`) }

myForm.addEventListener("submit", e => {
    e.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        studyset = e.target.result;
        validate(studyset.split('\n').map(_ => _.split('\t')));
    };
    reader.readAsText(input);
});