class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    /**
     * The constructor creates the clouds and positions them in the canvas.
     * @param {number} x - The coordinate where the cloud is inserted but the x-coordinate.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * x;
        this.animate();
    }

    /**
     * This function makes the clouds float to the left.
     */
    animate() {
        this.moveLeft();
    }

}