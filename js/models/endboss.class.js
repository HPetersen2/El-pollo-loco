class Endboss extends MovableObject {
    hit_sound = new Audio('audio/chicken-dead.mp3')
    height = 400;
    width = 250;
    y = 60;
    energy = 100;
    offset = {
        top: 120,
        bottom: 30,
        left: 40,
        right: 30
    };

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * The constructor creates the end boss and loads the images for the respective animations and starts the animations.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2000;
        this.animate();
    }

    /**
     * This function encourages the character to attack, sound the alarm and die. It also makes the final boss run to the left.
     */
    animate() {
        setInterval(() => {
            if(this.energy == 100) {this.playAnimation(this.IMAGES_ALERT)}
            if(this.energy < 100) {this.playAnimation(this.IMAGES_ATTACK)}
            if(this.energy <= 0) {this.died()}
        }, 200);

        setInterval(() => {
            if(this.live() && !this.otherDirection) {this.moveLeft()}
            if(this.live() && this.otherDirection) {this.moveRight()}
        }, 60);

        setInterval(() => {
            if(this.live()) {this.playAnimation(this.IMAGES_WALKING)}
        }, 100);
    }

    /**
     * This function checks whether the end boss is still alive.
     * @returns liveStatus
     */
    live() {
        return this.energy < 100 && this.energy > 0;
    }

    /**
     * This function plays the animation when the end boss is injured by a bottle.
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);   
    }

    /**
     * This function plays the animation when the final boss dies.
     */
    died() {
        this.playAnimationForOneTime(this.IMAGES_DEAD);
        setTimeout(() => winGame(), 2000);
    }
}