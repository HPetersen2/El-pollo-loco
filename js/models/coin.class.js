class Coin extends MovableObject {

    width = 128;
    height = 128;

    IMAGES_COINS = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];

    constructor(id) {
        super().loadImage('../img/8_coin/coin_1.png');
        this.id = id;
        this.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 1500;
        this.y = 200 + Math.random() * 150;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 200);
    }

    getId() {
        return this.id;
    }
}