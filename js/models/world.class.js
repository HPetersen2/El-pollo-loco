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

    constructor(canvas, keyboard, isGameStarted) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.isGameStarted = isGameStarted;
        // this.playGameSound();
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);

        setInterval(() => {
            this.checkCollisionEnemies();
        }, 25);
    }

    checkThrowObjects() {
        if(this.keyboard.D && this.character.numberOfBottles > 0 && !this.character.otherDirection) {
            this.character.numberOfBottles--;
            this.statusBarBottles.setPercentage(this.character.numberOfBottles);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.numberOfBottles, this.playSounds)
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.coins.forEach((coin, index) => {
            if(this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.playSound(this.collecting_coin_sound);
                this.character.numberOfCoins++;
                this.statusBarCoins.setPercentage(this.character.numberOfCoins);
            }
        });

        this.level.bottles.forEach((bottle, index) => {
            if(this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottles++
                this.playSound(this.collecting_bottle_sound);
                this.character.numberOfBottles++;
                this.statusBarBottles.setPercentage(this.character.numberOfBottles);
            }
        });

        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && enemy.energy > 0) {
                this.playSound(this.hurt_sound);
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
        
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if(bottle.isColliding(enemy) && enemy.energy > 0) {
                    this.playSound(this.dead_chicken_sound);
                    if(enemy.constructor.name == 'Chicken' || enemy.constructor.name == 'SmallChicken') {
                        enemy.energy = 0;
                        bottle.playAnimation(IMAGES_SPLASH);
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

    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if(this.character.isColliding(enemy) && this.character.y != 190 && enemy.constructor.name != 'Endboss') {
                this.playSound(this.dead_chicken_sound);
                enemy.energy = 0;
                // setTimeout(() => this.level.enemies.splice(index, 1), 1000)
            }
        });
    }

    // Draw() wird immer wieder aufgerufen
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0); // Back
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.ctx.translate(this.camera_x, 0); // Forwards

        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw()
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    playSound(sound) {
        if(this.playSounds) {
            sound.play();
        }
    }

    // playGameSound() {
    //     setInterval(() => {
    //         if(this.playSounds && isGameStarted) {
    //             this.game_sound.play();
    //         }
    //     }, 20);
    // }

    muteAllSounds() {
        let refMuteIcon = document.getElementById('mute')
        if(refMuteIcon.getAttribute("src") == './img/icons/volume-up.svg') {
            refMuteIcon.setAttribute("src", "./img/icons/volume-mute.svg");
            this.playSounds = false;
        } else if(refMuteIcon.getAttribute("src") == './img/icons/volume-mute.svg') {
            refMuteIcon.setAttribute("src", "./img/icons/volume-up.svg");
            this.playSounds = true;
        }
    }

}