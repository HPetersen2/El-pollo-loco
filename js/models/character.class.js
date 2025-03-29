class Character extends MovableObject {
    currentX;
    sleep = false;
    dead = false;
    height = 270;
    y = 150;
    world;
    walking_sound = new Audio('audio/running.mp3');
    sleeping_sound = new Audio('audio/sleep.mp3');

    offset = {
        top: 30,
        bottom: 0,
        left: 40,
        right: 30
    };

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_WALKING = [
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-22.png',
            'img/2_character_pepe/2_walk/W-23.png',
            'img/2_character_pepe/2_walk/W-24.png',
            'img/2_character_pepe/2_walk/W-25.png',
            'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * The constructor creates the character and loads the respective images. It also starts the intervals for jumping, running and sleeping.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
        this.defaultAnimate();
        this.sleeping();
    }

    /**
     * This function animates the character. Running, jumping and sleeping.
     */
    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.dead) {this.walkRight()};
            if(this.world.keyboard.LEFT && this.x > 0 && !this.dead) {this.walkLeft()};
            if(this.world.keyboard.SPACE && !this.isAboveGround() && !this.dead) {this.jump()};
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        setInterval(() => {
            if(this.sleep) {this.sleeps();}
            else if(this.isDead(this.energy)) {this.die();}
            else if(this.isHurt()) {this.playAnimation(this.IMAGES_HURT);}
            else if(this.isAboveGround()) {this.playAnimation(this.IMAGES_JUMPING);} else {
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT && !this.world.keyboard.SPACE) {this.playAnimation(this.IMAGES_WALKING);}
            }
        }, 60);
    }

    defaultAnimate() {
        setInterval(() => {
            if (!this.dead && !this.sleep && !this.isAboveGround() && this.x == this.currentX) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 60);
    }

    /**
     * This function animates the character to the left.
     */
    walkLeft() {
        this.wakeUp();
        this.otherDirection = true;
        this.moveLeft();
        this.world.playSound(this.walking_sound);
        this.savePosition();
    }

    /**
     * This function animates the character to the right.
     */
    walkRight() {
        this.wakeUp();
        this.moveRight();
        this.otherDirection = false;
        this.world.playSound(this.walking_sound);
        this.savePosition();
    }

    /**
     * This function animates the character with a jump.
     */
    jump() {
        this.wakeUp();
        this.speedY = 30;
    }

    /**
     * This function checks whether the character is still moving or already asleep.
     */
    sleeping() {
        setInterval(() => {
            if(this.currentX == this.x) {
                this.sleep = true;
            }
        }, 15000)
    }

    /**
     * This function encourages the character to sleep.
     */
    sleeps() {
        this.playAnimation(this.IMAGES_SLEEP);
        this.world.playSound(this.sleeping_sound);
    }

    /**
     * This function wakes up the character as soon as it moves.
     */
    wakeUp() {
        this.walking_sound.pause();
        this.sleep = false;
    }

    /**
     * This function saves the current position of the character to check when it has stopped moving and can fall asleep.
     */
    savePosition() {
        this.currentX = this.x;
    }

    /**
     * This function animates the character when it dies.
     */
    die() {
        this.playAnimation(this.IMAGES_DEAD);
        this.dead = true;
        setTimeout(() => loseGame(this.world.playSounds), 2000);
    }

}