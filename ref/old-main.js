//
// Depreciated
//

console.log("start");

var state = false;
var cards = 5;
var xoff = 300;

var term = [];
var termW = [];
var def = [];
var defW = [];
var xp = [];
var ID = [];

var cardx = `<div class="perspective" id="defWindow0"> <div class="animated" id="definition0"> <p class="definition text noselect">A word or phrase used to describe a thing or to express a concept, especially in a particular kind of language or branch of study.</p></div></div><div class="perspective" id="termWindow0"> <div class="animated" id="term0" onclick="flip()"> <p class="term text noselect">Term</p></div></div>`;

var cardHolder = document.createElement("div");
cardHolder.id = 'ch1';
cardHolder.innerHTML = "";

for (let i = 0; i < cards; i++) {
    cardHolder.innerHTML += cardx.replaceAll(0, i);
    xp.push((i - 2) * xoff);
    ID.push(i);
}

document.body.appendChild(cardHolder);

for (let i of ID) {
    term.push(document.getElementById('term' + i));
    termW.push(document.getElementById('termWindow' + i));
    def.push(document.getElementById('definition' + i));
    defW.push(document.getElementById('defWindow' + i));
}

function flip(id) {
    state = !state;
    xp[id] = 0;
    update(id);
}

function right(id) {
    xp[id] -= xoff;
    update(id);
}

function left(id) {
    xp[id] += xoff;
    update(id);
}

function update(id) {
    termW[id].style.zIndex = cards - Math.abs(xp[id] / xoff);
    defW[id].style.zIndex = cards - Math.abs(xp[id] / xoff);

    if (Math.abs(xp[id]) > xoff * 2.5) {
        termW[id].style.display = "none";
    } else {
        termW[id].style.display = "block";

        if (xp[id] == 0) { // Active card
            term[id].style.transform = `rotateX(${state * 180}deg)`;
            def[id].style.transform = `rotateX(${!state * -180}deg)`;
            term[id].style.opacity = !state * 100;
            def[id].style.opacity = state * 100;
        } else { // Inactive card
            if (state) state = !state;
            term[id].style.transform = `rotateY(${xp[id] * -0.1}deg)`;
            def[id].style.transform = `rotateY(${xp[id] * -0.1}deg)`;
            term[id].style.opacity = Math.max(1 - Math.abs(xp[id]) * 0.0012, 0) * 0.7;
            def[id].style.opacity = 0;
        }

    }

    let xpx = xp[id];
    let xpz = xp[id] ^ 0 ? -500 : 0;

    termW[id].style.transform = `translateX(${xpx}px)`;
    defW[id].style.transform = `translateX(${xpx}px)`;
    term[id].style.transform += `translateZ(${xpz}px)`;
    def[id].style.transform += `translateZ(${xpz}px)`;
}

document.addEventListener('keyup', e => {
    switch (e.key) {
        case "ArrowLeft":
            for (i of ID)
                left(i);
            break;
        case "ArrowRight":
            for (i of ID)
                right(i);
            break;
        case "ArrowUp":
            for (i of ID)
                if (xp[i] === 0)
                    flip(i);
            break;
        case "ArrowDown":
            for (i of ID)
                if (xp[i] === 0)
                    flip(i);
            break;
        case " ":
            for (i of ID)
                if (xp[i] === 0)
                    flip(i);
            break;
    }
});

for (i of ID) update(i);