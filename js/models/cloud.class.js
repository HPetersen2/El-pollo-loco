class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 5000;

    constructor() {
        super().loadImage('../img/3. Background/Layers/1. Light/1.png');

        this.x = Math.random() * 500;
    }
}