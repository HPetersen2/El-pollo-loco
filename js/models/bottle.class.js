class Bottle extends MovableObject {

    width = 96;
    height = 96;
    y = 345;

    IMAGES_BOTTLE = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 350 + Math.random() * 1500;
        this.animate()
    }

    animate() {
        this.randomImage(this.IMAGES_BOTTLE);
    }
}