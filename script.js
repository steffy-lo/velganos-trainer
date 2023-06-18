const bossAOE = document.getElementById("boss-aoe");
const blueOrb = document.getElementById("canvas");
const pizza = document.getElementById("pizza");

bossAOE.style.display = "none";
blueOrb.style.display = "none";
pizza.style.display = "none";

setTimeout(startVelganos, 2000);

function startVelganos() {
    bossAOE.style.display = "block";
    setTimeout(spawnBlueOrb, 1000);
}

function spawnBlueOrb() {
    blueOrb.style.display = "inline";
}

function startPizzaMech(x, y) {
    const PIZZA_BOOM_TIME_INTERVAL = 300;
    pizza.style.display = "block";
    pizza.style.left = `${x - 120}px`;
    pizza.style.top = `${y - 105}px`;
    const slice2 = document.getElementById("slice2");
    const slice4 = document.getElementById("slice4");
    const slice3 = document.getElementById("slice3");
    const slice1 = document.getElementById("slice1");
    setTimeout(() => {
        const character = document.getElementById("character");
        slice2.style.backgroundColor = "#fdf586";
        setTimeout(() => {
            if (
                elementsOverlap(character, slice1) ||
                elementsOverlap(character, slice3) ||
                elementsOverlap(character, slice4) ||
                !elementsOverlap(character, slice2)
            ) {
                gameOver();
            }
        }, PIZZA_BOOM_TIME_INTERVAL);

    }, 1000)
    setTimeout(() => {
        slice2.style.backgroundColor = "transparent";
    }, 2000)
    setTimeout(() => {
        const character = document.getElementById("character");
        slice4.style.backgroundColor = "#fdf586";
        setTimeout(() => {
            if (
                elementsOverlap(character, slice1) ||
                elementsOverlap(character, slice2) ||
                elementsOverlap(character, slice3) ||
                !elementsOverlap(character, slice4)
            ) {
                gameOver();
            }
        }, PIZZA_BOOM_TIME_INTERVAL);
    }, 2000)
    setTimeout(() => {
        slice4.style.backgroundColor = "transparent";
    }, 3000)
    setTimeout(() => {
        const character = document.getElementById("character");
        slice3.style.backgroundColor = "#fdf586";
        setTimeout(() => {
            if (
                elementsOverlap(character, slice1) ||
                elementsOverlap(character, slice2) ||
                elementsOverlap(character, slice4) ||
                !elementsOverlap(character, slice3)
            ) {
                gameOver();
            }
        }, PIZZA_BOOM_TIME_INTERVAL);
    }, 3000)
    setTimeout(() => {
        slice3.style.backgroundColor = "transparent";
    }, 4000)
    setTimeout(() => {
        const character = document.getElementById("character");
        slice1.style.backgroundColor = "#fdf586";
        setTimeout(() => {
            if (
                elementsOverlap(character, slice2) ||
                elementsOverlap(character, slice3) ||
                elementsOverlap(character, slice4) ||
                !elementsOverlap(character, slice1)
            ) {
                gameOver();
            }
        }, PIZZA_BOOM_TIME_INTERVAL);
    }, 4000)
    setTimeout(() => {
        slice1.style.backgroundColor = "transparent";
    }, 5000)
}

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
    );
}

function gameOver() {
    alert("Fail! Try again!");
    location.reload();
}
