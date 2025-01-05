class MovableObject extends DrawableObject{
    speed = 5;
    otherDirection = false;
    speedY= 0;
    acceleration = 2.5;
    currentX;
    energy = 100;
    dead = false;
    numberOfCoins = 0;
    numberOfBottles = 0;
    lastHit = 0;

    /**
     * This function removes gravity from the character and allows it to lift off.
     */
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/25);
    }

    /**
     * This function checks whether the character is just above the floor.
     * @returns y-coordinate
     */
    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * This function moves the object in the canvas to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * This function moves the object in the canvas to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * This function makes the object jump in the canvas.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * This function plays the animation when an object moves.
     * @param {array} images - Paths to the pictures
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * This function plays the animation only once when an object moves.
     * @param {array} images - Paths to the pictures
     */
    playAnimationForOneTime(images) {
        for (let i = 0; i < images.length; i++) {
            let path = images[i];
            this.img = this.imageCache[path];
        }
    }

    /**
     * This function generates a random path from an array containing paths to images.
     * @param {array} images - Paths to the pictures
     */
    randomImage(images) {
        let i = Math.floor(Math.random() * images.length);
        let path = images[i];
        this.img = this.imageCache[path];
    }

    /**
     * This function checks for a collision with the transferred object with another object in the canvas.
     * @param {obeject} mo - the object
     * @returns 
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&  // Rechts kollidiert mit Links
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // Oben kollidiert mit Unten
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&    // Links kollidiert mit Rechts
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;     // Unten kollidiert mit Oben
    }

    /**
     * This function checks for a violation.
     */
    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * This function saves the time of the last violation so that no more energy is drained if the functions are executed too quickly.
     * @returns 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 100; // Difference in s
        return timepassed < 1;
    }

    /**
     * This function checks whether the respective object is still alive or dead.
     * @param {number} energy 
     * @returns liveStatus
     */
    isDead(energy) {
        return energy == 0;
    }
    
}