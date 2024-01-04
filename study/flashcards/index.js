var state = !1,
    xoff = 300,
    term = [],
    termW = [],
    def = [],
    defW = [],
    xp = [],
    ID = [];

const study_set = sessionStorage.getItem("study_set").split('\n').map(_ => _.split('\t'));

createCard = (T, D, _) => `<div class="perspective" id="defWindow0"> <div class="animated" id="definition0"> <p class="definition text noselect">${D}</p></div></div><div class="perspective" id="termWindow0"> <div class="animated" id="term0" onclick="flip()"> <p class="term text noselect">${T}</p></div></div>`.replaceAll(0, _);

let cardHolder = document.createElement("div");
cardHolder.id = "ch1", cardHolder.innerHTML = "";

for (let i = 0; i < study_set.length; i++) {
    cardHolder.innerHTML += createCard(study_set[i][0], study_set[i][1], i);
    xp.push((i - 2) * xoff);
    ID.push(i);
}

document.body.appendChild(cardHolder);

for (const i of ID) {
    term.push(document.getElementById("term" + i));
    termW.push(document.getElementById("termWindow" + i));
    def.push(document.getElementById("definition" + i));
    defW.push(document.getElementById("defWindow" + i));

    term[i].style.opacity = 0;
    def[i].style.opacity = 0;
}

flip = $ => {
    state = !state, xp[$] = 0, update($)
};

right = $ => {
    xp[$] -= xoff, update($)
};

left = $ => {
    xp[$] += xoff, update($)
};

function update(t) {
    termW[t].style.zIndex = study_set.length - Math.abs(xp[t] / xoff);
    defW[t].style.zIndex = study_set.length - Math.abs(xp[t] / xoff);

    Math.abs(xp[t]) > 2.5 * xoff ?
        termW[t].style.display = "none" : (
            termW[t].style.display = "block",

            xp[t] == 0 ? ( // Active card
                term[t].style.transform = `rotateX(${180 * state}deg)`,
                def[t].style.transform = `rotateX(${-180 * !state}deg)`,
                term[t].style.opacity = 100 * !state,
                def[t].style.opacity = 100 * state
            ) : ( // Inactive card
                state && (state = !state), // Flip to term side
                term[t].style.transform = `rotateY(${-.1 * xp[t]}deg)`,
                def[t].style.transform = `rotateY(${-.1 * xp[t]}deg)`,
                term[t].style.opacity = .7 * Math.max(1 - .0012 * Math.abs(xp[t]), 0),
                def[t].style.opacity = 0
            )
        );

    const e = xp[t], // Continuous card tilt
        s = 0 ^ xp[t] ? -500 : 0; // Forward when focused, back when not

    termW[t].style.transform = `translateX(${e}px)`,
        defW[t].style.transform = `translateX(${e}px)`,
        term[t].style.transform += `translateZ(${s}px)`,
        def[t].style.transform += `translateZ(${s}px)`;
}

for (i of
    (document.addEventListener("keyup", r => {
        switch (r.key) {
            case "ArrowLeft":
                if (xp[0] < 0) {
                    for (i of ID) left(i)
                }
                break;
            case "ArrowRight":
                if (xp.slice(-1) > 0) {
                    for (i of ID) right(i);
                }
                break;
            case "ArrowUp":
            case "ArrowDown":
            case " ":
                for (i of ID) xp[i] === 0 && flip(i)
        }
    }), ID)
) update(i);
