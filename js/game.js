let canvas;
let world;
let keyboard = new Keyboard();
let isGameStarted = false;
let gameWon = false;
let gameLose = false;
let win_sound = new Audio('./audio/win.mp3');
let lose_sound = new Audio('./audio/lose.mp3');

/**
 * This function is called at the start of the game.
 */
function init() {
    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('start-screen');
    endScreen = document.getElementById('end-screen');
    muteButton = document.getElementById('mute-desktop');
    mobileButtonsTop = document.getElementById('mobile-buttons-top');
    mobileButtonsBottom = document.getElementById('mobile-buttons-bottom');
    gameCondition(canvas, startScreen, endScreen, mobileButtonsTop, mobileButtonsBottom, muteButton);
    checkOrientation();
}

/**
 * This function determines the size of the device from the user.
 * @returns boolean
 */
function getDeviceType() {
    let width = window.innerWidth;
    if (width <= 720) {
        return true;
        } else {
        return false;
        }
}

/**
 * This function starts the respective level.
 * @param {number} level 
 */
function initLevel(level) {
    startLevel1(level);
}

/**
 * This function checks the status of the game.
 * @param {string} canvas 
 * @param {string} startScreen 
 * @param {string} endScreen 
 * @param {string} mobileButtonsTop 
 * @param {string} mobileButtonsBottom 
 */
function gameCondition(canvas, startScreen, endScreen, mobileButtonsTop, mobileButtonsBottom, muteButton) {
    clearAllIntervals();
    if (isGameStarted) {
        initLevel(1);
        world = new World(canvas, keyboard, isGameStarted);
        disabledStartScreen(canvas, startScreen, mobileButtonsTop, mobileButtonsBottom, muteButton);
        document.getElementById('mute-desktop-button').setAttribute('src', './img/icons/volume-up.svg');
    } else if(!isGameStarted && !gameWon && !gameLose) {
        enableStartScreen(canvas, startScreen, mobileButtonsTop, mobileButtonsBottom, muteButton);
    } else if(!isGameStarted && gameLose || gameWon) {
        renderEndScreen(canvas, startScreen, endScreen, mobileButtonsTop, mobileButtonsBottom, muteButton);
    }
}

/**
 * This function deactivates the start screen and activates the canvas.
 * @param {string} canvas 
 * @param {string} startScreen 
 * @param {string} mobileButtonsTop 
 * @param {string} mobileButtonsBottom 
 */
function disabledStartScreen(canvas, startScreen, mobileButtonsTop, mobileButtonsBottom, muteButton) {
    canvas.classList.remove('d_none');
    canvas.classList.add('d_flex');
    muteButton.classList.remove('d_none');
    muteButton.classList.add('d_flex');
    startScreen.classList.remove('d_flex');
    startScreen.classList.add('d_none');
    if(getDeviceType()) {
        muteButton.classList.add('d_none');
        mobileButtonsTop.classList.remove('d_none');
        mobileButtonsTop.classList.add('d_flex');
        mobileButtonsBottom.classList.remove('d_none');
        mobileButtonsBottom.classList.add('d_flex');
    }
}

/**
 * This function activates the start screen and deactivates the canvas.
 * @param {string} canvas 
 * @param {string} startScreen 
 * @param {string} mobileButtonsTop 
 * @param {string} mobileButtonsBottom 
 */
function enableStartScreen(canvas, startScreen, mobileButtonsTop, mobileButtonsBottom, muteButton) {
    canvas.classList.remove('d_flex');
    canvas.classList.add('d_none');
    muteButton.classList.remove('d_flex');
    muteButton.classList.add('d_none');
    startScreen.classList.remove('d_none');
    startScreen.classList.add('d_flex');
    if(getDeviceType()) {
        muteButton.classList.add('d_none');
        mobileButtonsTop.classList.remove('d_flex');
        mobileButtonsTop.classList.add('d_none');
        mobileButtonsBottom.classList.remove('d_flex');
        mobileButtonsBottom.classList.add('d_none');
    }
}

/**
 * This function activates the end screen and deactivates the canvas.
 * @param {string} canvas 
 * @param {string} startScreen 
 * @param {string} endScreen 
 * @param {string} mobileButtonsTop 
 * @param {string} mobileButtonsBottom 
 */
function enableEndScreen(canvas, startScreen, endScreen, mobileButtonsTop, mobileButtonsBottom, muteButton) {
    canvas.classList.remove('d_flex');
    canvas.classList.add('d_none');
    startScreen.classList.remove('d_flex');
    startScreen.classList.add('d_none');
    endScreen.classList.remove('d_none');
    endScreen.classList.add('d_flex');
    muteButton.classList.remove('d_flex');
    muteButton.classList.add('d_none');
    mobileButtonsTop.classList.remove('d_flex');
    mobileButtonsTop.classList.add('d_none');
    mobileButtonsBottom.classList.remove('d_flex');
    mobileButtonsBottom.classList.add('d_none');
}

/**
 * This function renders the final screen.
 * @param {string} canvas 
 * @param {string} startScreen 
 * @param {string} endScreen 
 * @param {string} mobileButtonsTop 
 * @param {string} mobileButtonsBottom 
 */
function renderEndScreen(canvas, startScreen, endScreen, mobileButtonsTop, mobileButtonsBottom, muteButton) {
    let wonPfad = './img/9_intro_outro_screens/you_won_screen.png';
    let losePfad = './img/9_intro_outro_screens/game_over_screen.png';
    let pfad;
    if(gameWon) {
        pfad = wonPfad;
    } else if(gameLose) {
        pfad = losePfad;
    }
    disabledStartScreen(canvas, startScreen, mobileButtonsTop, mobileButtonsBottom, muteButton);
    enableEndScreen(canvas, startScreen, endScreen, mobileButtonsTop, mobileButtonsBottom, muteButton);
    endScreen.style.backgroundImage = `url('${pfad}')`;
}

/**
 * This function starts the game.
 */
function startGame() {
    isGameStarted = true;
    if(gameLose || gameWon) {
        gameLose = false;
        gameWon = false;
        document.getElementById('end-screen').classList.remove('d_flex');
        document.getElementById('end-screen').classList.add('d_none');
    }
    init();
}

/**
 * This function stops the game.
 */
function stopGame() {
    isGameStarted = false;
    init();
}

/**
 * This function is called when the game is won.
 */
function winGame() {
    world.level.enemies.forEach((enemy) => {
        if(enemy instanceof Endboss && enemy.energy < 0 && world.character.energy > 0) {
            gameWon = true;
            if(checkPlayGameSound()) {
                win_sound.play();
            }
            stopGame();
        }
    });
}

/**
 * This function is called when the game is lost.
 */
function loseGame() {
    gameLose = true;
    if(checkPlayGameSound()) {
        lose_sound.play();
    } 
    stopGame();

}

/**
 * This function is called when the player wants to return to the Homescreen.
 */
function backHome() {
    isGameStarted = false;
    gameWon = false;
    gameLose = false;
    document.getElementById('end-screen').classList.remove('d_flex');
    document.getElementById('end-screen').classList.add('d_none');
    init();
}

/**
 * This function opens and closes the overlay.
 */
function toggleOverlay() {
    let refOverlay = document.getElementById('overlay');
    let currentStyle = window.getComputedStyle(refOverlay).display;
    if(currentStyle == 'none') {
        refOverlay.style.display = 'flex';
    } else if(currentStyle == 'flex') {
        refOverlay.style.display = 'none';
    }
}

/**
 * This function closes the overlay when you click next to it.
 * @param {event} event 
 */
function handleOverlayClick(event) {
    const refOverlay = document.getElementById('overlay');
    const overlayContent = document.querySelector('.overlay-content');
    if (!overlayContent.contains(event.target)) {
        refOverlay.style.display = 'flex';
    }
}

/**
 * This function starts the full screen mode.
 */

function startFullscreen() {
    let fullscreen = document.getElementById('fullscreen-container');
    enterFullscreen(fullscreen);
}

/**
 * This function ends all intervals.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * 
 * @param {string} element 
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * This function ends full screen mode.
 */
function exitFullscreen(element) {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * This function checks the browser and aligns the canvas correctly accordingly.
 */
function checkOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 480) {
            newHeight = window.innerHeight;
            document.getElementById('canvas').style.height = `${newHeight}px`;
        }
    }
    else {
        document.getElementById('canvas').style.height = `100%`;
    }
}

/**
 * This function checks whether the sound is switched on or off.
 * @returns playSound on or off
 */
function checkPlayGameSound() {
    if(getDeviceType()) {
        if(document.getElementById('mute').getAttribute('src') == './img/icons/volume-up.svg') {return true;}    
        if(document.getElementById('mute').getAttribute('src') == './img/icons/volume-mute.svg') {return false;}
    } else if(!getDeviceType()) {
        if(document.getElementById('mute-desktop-button').getAttribute('src') == './img/icons/volume-up.svg') {return true;}    
        if(document.getElementById('mute-desktop-button').getAttribute('src') == './img/icons/volume-mute.svg') {return false;}
    }
}