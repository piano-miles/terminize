const myForm = document.getElementById("import");
const csvFile = document.getElementById("study_set");
let study_set = "";

function validate(e) {
    let t = !0;
    for (const i of e) t = t && i.length == 2;
    t ? (
        sessionStorage.setItem("study_set", study_set),
        body = document.getElementsByTagName("body")[0],
        body.innerHTML = `<body><p id="validation">Your set with ${e.length} terms has been validated. You will be redirected shortly.</p></body>`,
        setTimeout(() => window.location.replace("../study"), 1500)
    ) : (
        document.write("Your study set is invalid. Please ensure your study set separates each term and corresponding definition with a tab, and each term-definition pair with a new line."),
        setTimeout(() => location.reload(), 3e3)
    )
}

logset = _ => { for (card of _) console.log(`study_set: ${card}`) }

myForm.addEventListener("submit",
    t => {
        t.preventDefault();
        const e = csvFile.files[0],
            n = new FileReader;
        n.onload = function (t) {
            validate((study_set = t.target.result).split("\n").map(t => t.split("	")))
        },
            n.readAsText(e)
    }
);