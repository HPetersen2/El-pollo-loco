let level1;

/**
 * This function starts the respective level.
 * @param {number} level - The function receives the number from the level.
 */
function start(level) {
    if(level == 1) {
        startLevel1();
    }
}

/**
 * This function creates the level and the corresponding objects.
 */
function startLevel1() {
    level1 = new Level([
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken()
    ],
    [
        new Cloud(500),
        new Cloud(1000),
        new Cloud(1500),
        new Cloud(2000),
        new Cloud(2500)
    ],
    [
        new BackgroundObject('../img/5_background/layers/air.png', -719),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', -719),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('../img/5_background/layers/air.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/air.png', 719),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundObject('../img/5_background/layers/air.png', 719*2),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719*2),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgroundObject('../img/5_background/layers/air.png', 719*3),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719*3),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719*3)
    ],    
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ],
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ]
);

}