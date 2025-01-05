class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 150;
    width = 100;
    
    /**
     * This function loads a single image.
     * @param {string} path - The path from the picture.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function draws the respective images into the canvas.
     * @param {string} ctx - This parameter transfers the reference to the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * This function draws a frame around the respective objects. It is used for development purposes.
     * @param {string} ctx - This parameter transfers the reference to the canvas.
     */
    drawFrame(ctx) {
        if(this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * This function loads several images at once.
     * @param {array} arr - This array contains several paths to images that are all to be loaded.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    
}