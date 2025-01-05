class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    
    /**
     * The constructor creates the background.
     * @param {string} imagePath 
     * @param {number} x 
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }

}