class Coin extends MovableObject {
    width = 128;
    height = 128;
    offset = {
        top: 100,
        bottom: 30,
        left: 30,
        right: 20
    };

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Der Constructor erstellt einen Coin und positioniert ihm im Kanvas.
     */
    constructor() {
        super();
        this.loadImage('../img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 1600;
        this.y = 200 + Math.random() * 150;
        this.animate();
    }

    /**
     * This function animates the coins in the canvas in which they rotate.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 200);
    }
}