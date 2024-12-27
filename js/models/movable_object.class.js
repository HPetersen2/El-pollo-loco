class MovableObject extends DrawableObject{
    speed = 1.5;
    otherDirection = false;
    speedY= 0;
    acceleration = 2.5;
    currentX;
    energy = 100;
    dead = false;
    numberOfCoins = 0;
    numberOfBottles = 0;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    randomImage(images) {
        let i = Math.floor(Math.random() * images.length);
        let path = images[i];
        this.img = this.imageCache[path];
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&  // Rechts kollidiert mit Links
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // Oben kollidiert mit Unten
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&    // Links kollidiert mit Rechts
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;     // Unten kollidiert mit Oben
    }

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 100; // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }
}