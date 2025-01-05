class StatusBarCoins extends DrawableObject {
    percentage = 0;

    IMAGES = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * The constructor loads the image of the status bar, positions it and sets it to 100%.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * This function returns the respective path, depending on which status bar is to be displayed.
     * @param {number} numberOfCoins - This variable is passed the number of coins.
     */
    setPercentage(numberOfCoins) {
        this.calculatePercentage(numberOfCoins);
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * This function returns the index for the respective image, using the respective percentage.
     * @returns index
     */
    resolveImageIndex() {
        if(this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * This function uses the number of coins to calculate the value as a percentage.
     * @param {number} numberOfCoins - This variable is passed the number of coins.
     */
    calculatePercentage(numberOfCoins) {
        this.percentage = numberOfCoins / 10 * 100;
    }
    
}