class ThrowableObject extends MovableObject {
    speedY = 0;
    speedX = 0;
    numberOfBottles = 0;
    playSounds;
    throw_sound = new Audio('audio/throw.mp3');

    constructor(x, y, numberOfBottles, playSounds) {
        super().loadImage('../img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.numberOfBottles = numberOfBottles;
        this.playSounds = playSounds;
        this.throw();
        this.playSound();
    }

    animate() {
        setInterval(() => {
            if(this.world.keyboard.D) {
                this.throw();
            }
        }, 1000 / 60)
    }

    throw() {
        this.speedY = 30;
        this.speedX = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    playSound() {
        if(this.playSounds) {
            this.throw_sound.play();
        }
    }
}