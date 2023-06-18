let canvas = document.getElementById("canvas");
let characterEl = document.getElementById("character");
let characterElBounds = characterEl.getBoundingClientRect();
let ctx = canvas.getContext("2d");
let canvasBounds = canvas.getBoundingClientRect();
let characterPos = { x: characterElBounds.left, y: characterElBounds.top };

canvas.addEventListener("mousedown", (e) => {
    characterPos.x = e.x - canvasBounds.x;
    characterPos.y = e.y - canvasBounds.y;
    target = new Target();
});

let pizzaMech = false;

class Orb {
    constructor() {
        this.x = 700;
        this.y = 550;
        this.pt = { x: 0, y: 0 };
        this.color = "#0068f0";
        this.angle1 = 0;
        this.angle2 = 0;
        this.dir = 1;
    }
    draw() {
        ctx.save();
        if (Math.abs(this.x - characterPos.x) < 40 && Math.abs(this.y - characterPos.y) < 40) {
            // Start pizza mech
            pizzaMech = true;
            startPizzaMech(characterPos.x, characterPos.y);
            // Orb touches player
            canvas.style.display = "none";
        }
        //use translate to move the orb
        ctx.translate(this.x, this.y);
        //angle1 is the angle from the orb to the target point
        //angle2 is the orbs current rotation angle. Once they equal each other then the rotation stops. When you click somewhere else they are no longer equal and the orb will rotate again.
        if (!this.direction(this.angle1, this.angle2)) {
            //see direction() method for more info on this
            if (this.dir == 1) {
                this.angle2 += 0.05; //change rotation speed here
            } else if (this.dir == 0) {
                this.angle2 -= 0.05; //change rotation speed here
            }
        } else {
            this.angle2 = this.angle1;
        }
        ctx.fillStyle = "#0068f0";
        ctx.beginPath();
        ctx.arc(this.pt.x, this.pt.y, 40, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.pt.x, this.pt.y);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
    driveToTarget() {
        //get angle to mouse click
        this.angle1 = Math.atan2(characterPos.y - this.y, characterPos.x - this.x);
        //normalize vector
        let vecX = characterPos.x - this.x;
        let vecY = characterPos.y - this.y;
        let dist = Math.hypot(vecX, vecY);
        vecX /= dist;
        vecY /= dist;
        //Prevent continuous x and y increment by checking if either vec == 0
        if (vecX != 0 || vecY != 0) {
            //then also give the orb a little buffer incase it passes the given point it doesn't turn back around. This allows time for it to stop if you increase the speed.
            if (
                this.x >= characterPos.x + 3 ||
                this.x <= characterPos.x - 3 ||
                this.y >= characterPos.y + 3 ||
                this.y <= characterPos.y - 3
            ) {
                this.x += vecX * 0.2; //multiple VecX by n to increase speed (vecX*2)
                this.y += vecY * 0.2; //multiple VecY by n to increase speed (vecY*2)
            }
        }
    }
    direction(ang1, ang2) {
        //converts rads to degrees and ensures we get numbers from 0-359
        let a1 = ang1 * (180 / Math.PI);
        if (a1 < 0) {
            a1 += 360;
        }
        let a2 = ang2 * (180 / Math.PI);
        if (a2 < 0) {
            a2 += 360;
        }
        //checks whether the target is on the right or left side of the orb.
        //We use then to ensure it turns in the shortest direction
        if ((360 + a1 - a2) % 360 > 180) {
            this.dir = 0;
        } else {
            this.dir = 1;
        }
        //Because of animation timeframes there is a chance the orb could turn past the target if rotating too fast. This gives the orb a 1 degree buffer to either side of the target to determine if it is pointed in the right direction.
        //We then correct it to the exact degrees in the draw() method above once the if statment defaults to 'else'
        if (
            Math.trunc(a2) <= Math.trunc(a1) + 1 &&
            Math.trunc(a2) >= Math.trunc(a1) - 1
        ) {
            return true;
        }
        return false;
    }
}

class Target {
    constructor() {
        this.x = characterPos.x;
        this.y = characterPos.y;
        this.r = 3;
        this.color = "#ffe5ad";
    }
}

let target;
let orb = new Orb();

function animate() {
    if (!pizzaMech) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        orb.draw();
        orb.driveToTarget();
        requestAnimationFrame(animate);
    }
}
animate();