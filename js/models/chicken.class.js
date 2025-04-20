class Chicken extends MovableObject {
    y = 390;
    height = 60;
    width = 80;
    energy = 100;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 5
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * The constructor positions the chicken in the canvas. It also loads the images and starts the animation function.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 300 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }
    
    /**
     * This function lets the chicken run to the left or lets it die and animates it in the process.
     */
    animate() {
        let lastMoveFrame = 0;
        let lastAnimFrame = 0;
        const loop = (timestamp) => {
            if (timestamp - lastMoveFrame > 1000 / 60) {
                if (!this.isDead(this.energy)) {
                    this.moveLeft();
                }
                lastMoveFrame = timestamp;
            }
            if (timestamp - lastAnimFrame > 200) {
                if (!this.isDead(this.energy)) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    this.playAnimation(this.IMAGES_DEAD);
                }
                lastAnimFrame = timestamp;
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

}