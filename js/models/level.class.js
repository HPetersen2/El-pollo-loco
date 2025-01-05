class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2200;
    
    /**
     * The constructor creates the objects in the canvas and saves them in a variable.
     * @param {object} enemies 
     * @param {object} clouds 
     * @param {object} backgroundObjects 
     * @param {object} bottles 
     * @param {object} coins 
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}