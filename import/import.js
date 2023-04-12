const myForm = document.getElementById("import");
const csvFile = document.getElementById("studyset");
var studyset = "";

function validate(e) {
    let t = !0;
    for (const i of e) t = t && 2 == i.length;
    t ? (
        sessionStorage.setItem("studyset", studyset),
        document.write(`Your set with ${e.length} terms has been validated. You will be redirected shortly.`),
        setTimeout(() => window.location.replace("../study"), 1500)
    ) : (
        document.write("Your study set is invalid. Please ensure your study set separates each term and corresponding definition with a tab, and each term-definition pair with a new line."),
        setTimeout(() => location.reload(), 3e3)
    )
}

logset = _ => { for (card of _) console.log(`studyset: ${card}`) }

myForm.addEventListener("submit",
    t => {
        t.preventDefault();
        const e = csvFile.files[0],
            n = new FileReader;
        n.onload = function (t) {
            validate((studyset = t.target.result).split("\n").map(t => t.split("	")))
        },
            n.readAsText(e)
    }
);