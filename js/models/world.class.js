class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarEndboss = new StatusBarEndboss();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    throwableObjects = [];
    playSounds = true;
    game_sound = new Audio('./audio/el_pollo_loco.mp3');
    collecting_coin_sound = new Audio('./audio/collect.mp3');
    collecting_bottle_sound = new Audio('./audio/bottle.mp3');
    hurt_sound = new Audio('./audio/hurt.mp3');
    dead_chicken_sound = new Audio('./audio/chicken-dead.mp3');
    isGameStarted;

    /**
     * The constructor creates the canvas and creates the world.
     * @param {object} canvas 
     * @param {object} keyboard 
     * @param {boolean} isGameStarted 
     */
    constructor(canvas, keyboard, isGameStarted) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.isGameStarted = isGameStarted;
        this.playGameSound();
        this.draw();
        this.setWorld();
        this.run();
        this.isPlaySoundsOn();
    }

    /**
     * This function places the character in the World.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * This function checks for collisions with other objects when the character is running.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);

        setInterval(() => {
            this.checkCollisionEnemyWithCharacterTop();
            this.meetCharcterEndboss();
        }, 15);
    }

    /**
     * This function checks whether a bottle is thrown.
     */
    checkThrowObjects() {
        if(this.keyboard.D && this.character.numberOfBottles > 0 && !this.character.otherDirection) {
            this.character.wakeUp();
            this.character.playAnimation(this.character.IMAGES_IDLE);
            this.character.numberOfBottles--;
            this.statusBarBottles.setPercentage(this.character.numberOfBottles);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.numberOfBottles, this.playSounds);
            this.throwableObjects.push(bottle);
        }
    }

    /**
     * This function calls up all collision functions.
     */
    checkCollisions() {
        this.checkCollisionCharacterWithEnemy();
        this.checkCollisionEnemyWithBottle();
        this.checkCollisionBottle();
        this.checkCollisionCoin();
    }

    /**
     * This function checks for a collision with an enemy.
     */
    checkCollisionCharacterWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && enemy.energy > 0) {
                this.character.wakeUp();
                this.playSound(this.hurt_sound);
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * This function checks for a collision with a bottle.
     */
    checkCollisionEnemyWithBottle() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if(bottle.isColliding(enemy) && enemy.energy > 0) {
                    this.playSound(this.dead_chicken_sound);
                    if(enemy.constructor.name == 'Chicken' || enemy.constructor.name == 'SmallChicken') {
                        enemy.energy = 0;
                        bottle.playAnimation(bottle.IMAGES_SPLASH);
                    } else if(enemy.constructor.name == 'Endboss') {
                        enemy.energy -= 10;
                        this.statusBarEndboss.setPercentage(enemy.energy);
                        bottle.playAnimation(bottle.IMAGES_SPLASH);
                        enemy.playHurtAnimation();
                    }
                }
            })
        });
    }

    /**
     * This function checks for a collision with a coin.
     */
    checkCollisionCoin() {
        this.level.coins.forEach((coin, index) => {
            if(this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.playSound(this.collecting_coin_sound);
                this.character.numberOfCoins++;
                this.statusBarCoins.setPercentage(this.character.numberOfCoins);
            }
        });
    }

    /**
     * This function checks for a collision with a bottle.
     */
    checkCollisionBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if(this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottles++
                this.playSound(this.collecting_bottle_sound);
                this.character.numberOfBottles++;
                this.statusBarBottles.setPercentage(this.character.numberOfBottles);
            }
        });
    }

    /**
     * This function checks a collision with a character from top the enemy.
     */
    checkCollisionEnemyWithCharacterTop() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && this.character.speedY > 0 && enemy.speedY == 0 && enemy.constructor.name != 'Endboss') {
                if(!this.keyboard.SPACE) {
                    this.playSound(this.dead_chicken_sound);
                    enemy.energy = 0;
                }
            }
        });
    }

    /**
     * This function draws the objects into the canvas and is called again and again.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0); // Back
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.ctx.translate(this.camera_x, 0); // Forwards
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw()
        });
    }

    /**
     * This function adds several objects to the map.
     * @param {object} objects 
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * This function adds a single object to the map.
     * @param {object} mo 
     */
    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * This function mirrors an image.
     * @param {object} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This function reflects an image back.
     * @param {object} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * This function plays a sound.
     * @param {string} sound 
     */
    playSound(sound) {
        if(this.playSounds) {
            sound.play();
        }
    }

    /**
     * This function play background sound in the game.
     */
    playGameSound() {
        setInterval(() => {
            if(this.playSounds && isGameStarted) {
                this.game_sound.play();
            }
        }, 20);
    }

    /**
     * This function switches the sound on or off.
     */
    togglePlaySoundOnOff() {
        let muteButtonRef = document.getElementById('mute-desktop-button');
        if(this.playSounds) {
            this.playSounds = false;
            muteButtonRef.src = './img/icons/volume-mute.svg'
        } else if(!this.playSounds) {
            this.playSounds = true;
            muteButtonRef.src = './img/icons/volume-up.svg'
        }
    }

    /**
     * This function mutes all sounds.
     */
    muteAllSounds() {
        let refMuteIcon = document.getElementById('mute');
        if(refMuteIcon.getAttribute("src") == './img/icons/volume-up.svg') {
            refMuteIcon.setAttribute("src", "./img/icons/volume-mute.svg");
            this.playSounds = false;
        } else if(refMuteIcon.getAttribute("src") == './img/icons/volume-mute.svg') {
            refMuteIcon.setAttribute("src", "./img/icons/volume-up.svg");
            this.playSounds = true;
        }
    }

    /**
     * This function checks whether the sound is switched on.
     */
    isPlaySoundsOn() {
        let refMuteIcon = document.getElementById('mute');
        if(this.playSounds) {
            refMuteIcon.setAttribute("src", "./img/icons/volume-up.svg");
        } else {
            refMuteIcon.setAttribute("src", "./img/icons/volume-mute.svg");
        }
    }

    /**
     * This function checks whether the character is behind the enboss. Then the direction is changed.
     */
    meetCharcterEndboss() {
        this.level.enemies.forEach((enemy) => {
            if(enemy instanceof Endboss) {
                if(enemy.x <= this.character.x && !enemy.otherDirection && this.character.energy > 0) {
                    enemy.otherDirection = true;
                } else if(enemy.x >= this.character.x && enemy.otherDirection && this.character.energy > 0) {
                    enemy.otherDirection = false;
                }
            }
        })
    }

}