let angle = 0;
let speed = 0.05;
let numArms = 5;
let whirlpool = true;
let pizzaDirection;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    pizzaDirection = Math.random() < 0.5 ? 1 : -1;
    noFill();
}

function draw() {
    if (pizzaMech && whirlpool) {
        background('#8fc7f1');
        translate(pizzaPos.x, pizzaPos.y);
        for (let i = 0; i < numArms; i++) {
            rotate(TWO_PI / numArms);
            spiralArm(100);
        }
        angle += speed;
        setTimeout(() => {
            resizeCanvas(0, 0);
            whirlpool = false;
        }, 1000)
    }
}

function spiralArm(len) {
    stroke(0);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < 200; i++) {
        let r = map(i, 0, 200, 0, len);
        let theta = map(i, 0, 200, 0, TWO_PI) + angle * pizzaDirection;
        let x = r * cos(theta);
        let y = r * sin(theta);
        vertex(x, y);
    }
    endShape();
}