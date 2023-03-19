var state = false;
var term = document.getElementById('term');
var termW = document.getElementById('termWindow');
var def = document.getElementById('definition');
var defW = document.getElementById('defWindow');
var x = 0;
console.log(x);

function flip() {
    console.log('flip');
    state = !state;
    x = 0;
    update();
}

function right() {
    console.log('right');
    x += 256;
    update()
}

function left() {
    console.log('left');
    x -= 256;
    update()
}

function update() {
    console.log(x);
    if (x == 0) { // Active card
        term.style.transform = `rotateX(${state * 180}deg)`;
        def.style.transform = `rotateX(${!state * -180}deg)`;
        console.log("rotatex");
        term.style.opacity = !state * 100;
        def.style.opacity = state * 100;
    } else { // Inactive card
        if (state) state = !state;
        term.style.transform = `rotateY(${x * -0.1}deg)`;
        def.style.transform = `rotateY(${x * -0.1}deg)`;
        term.style.opacity = Math.max(1 - Math.abs(x) * 0.0012, 0) * 0.7;
        def.style.opacity = 0;
    }
    termW.style.transform = `translateX(${x}px)`;
    defW.style.transform = `translateX(${x}px)`;
}

document.addEventListener('keyup', e => {
    switch (e.key) {
        case "ArrowLeft":
            left();
            break;
        case "ArrowRight":
            right();
            break;
        case "ArrowUp":
            flip();
            break;
        case "ArrowDown":
            flip();
            break;
        case " ":
            flip();
            break;
    }
});