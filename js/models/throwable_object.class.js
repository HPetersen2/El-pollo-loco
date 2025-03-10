class ThrowableObject extends MovableObject {
    speedY = 0;
    speedX = 0;
    numberOfBottles = 0;
    playSounds;
    throw_sound = new Audio('audio/throw.mp3');

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * The constructor loads a bottle that is thrown.
     * @param {number} x - Coordiate
     * @param {number} y - Coordiate
     * @param {number} numberOfBottles - Number of Bottles
     * @param {boolean} playSounds - Play sound is on or off
     */
    constructor(x, y, numberOfBottles, playSounds) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.numberOfBottles = numberOfBottles;
        this.playSounds = playSounds;
        this.throw();
        this.playSound();
    }

    /**
     * This function is called as soon as the bottle is thrown. It is then animated.
     */
    animate() {
        setInterval(() => {
            if(this.world.keyboard.D) {
                this.throw();
            }
        }, 1000 / 60)
    }

    /**
     * This function sets the speed and thus the coordinates.
     */
    throw() {
        this.speedY = 30;
        this.speedX = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    /**
     * This function plays a sound as soon as the bottle is thrown.
     */
    playSound() {
        if(this.playSounds) {
            this.throw_sound.play();
        }
    }
    
}