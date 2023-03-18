var state = false;
var term = document.getElementById('term');
var termW = document.getElementById('termWindow');
var def = document.getElementById('definition');
var defW = doocument.getElementById('defWindow');
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
    x += 170;
    update()
}

function left() {
    console.log('left');
    x -= 170;
    update()
}

function update() {
    console.log(x);
    if (x == 0) {
        term.style.transform = `rotateX(${state * 180}deg)`;
        def.style.transform = `rotateX(${!state * -180}deg)`;
        console.log("rotatex");
    } else {
        //term.style.transform = `rotateY(${x * -0.05}deg)`;
        //def.style.transform = `rotateY(${x * -0.05}deg)`;
    }
    term.style.opacity = !state * 100;
    def.style.opacity = state * 100;
    //termW.style.transform = `translateX(${x}px)`;
    //defW.style.transform = `translateX(${x}px)`;
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') flip()
})

document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            left();
            break;
        case 39:
            right();
            break;
        case 38:
            // up
            break;
        case 40:
            // down
            break;
    }
};
