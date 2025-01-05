class Bottle extends MovableObject {
    width = 96;
    height = 96;
    y = 345;

    offset = {
        top: 0,
        bottom: 0,
        left: 20,
        right: 5
    };

    IMAGES_BOTTLE = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * The constructor creates the bottles that can be collected.
     */
    constructor() {
        super().loadImage('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 350 + Math.random() * 1500;
        this.randomImage(this.IMAGES_BOTTLE);
    }

}