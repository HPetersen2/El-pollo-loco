class Character extends MovableObject {

    currentX;
    sleep = false;
    dead = false;

    height = 300;
    y = 100;

    offset = {
        top: 120,
        bottom: 30,
        left: 40,
        right: 30
    };

    IMAGES_IDLE = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_WALKING = [
            '..//img/2_character_pepe/2_walk/W-21.png',
            '..//img/2_character_pepe/2_walk/W-22.png',
            '..//img/2_character_pepe/2_walk/W-23.png',
            '..//img/2_character_pepe/2_walk/W-24.png',
            '..//img/2_character_pepe/2_walk/W-25.png',
            '..//img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_SLEEP = [
        '../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    world;
    walking_sound = new Audio('audio/running.mp3');
    sleeping_sound = new Audio('audio/sleep.mp3');

    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
        this.sleeping();
    }

    animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.dead) {
                this.sleep = false;
                this.moveRight();
                this.otherDirection = false;
                this.world.playSound(this.walking_sound);
                this.currentX = this.x;
            }
            if(this.world.keyboard.LEFT && this.x > 0 && !this.dead) {
                this.sleep = false;
                this.otherDirection = true;
                this.moveLeft();
                this.world.playSound(this.walking_sound);
                this.currentX = this.x;
            }
            if(this.world.keyboard.SPACE && !this.isAboveGround() && !this.dead) {
                this.sleep = false;
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        setInterval(() => {
            if(this.sleep) {
                this.playAnimation(this.IMAGES_SLEEP);
                this.world.playSound(this.sleeping_sound);
            }
            else if(this.isDead(this.energy)) {
                this.playAnimation(this.IMAGES_DEAD);
                this.dead = true;
                endGame();
            }
            else if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 100);
    }

    jump() {
        this.speedY = 30;
    }

    sleeping() {
        setInterval(() => {
            if(this.currentX == this.x) {
                this.sleep = true;
            }
        }, 15000)
    }

}