class ThrowableObject extends MovableObject {
    speedY = 0;
    speedX = 0;


    constructor(x, y) {
        super().loadImage('../img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    animate() {
        setInterval(() => {
            if(this.world.keyboard.D) {
                this.throw();
            }
        }, 1000 / 60)
    }

    throw() {
        this.speedY = 30;
        this.speedX = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}