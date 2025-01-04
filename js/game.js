let canvas;
let world;
let keyboard = new Keyboard();
let isGameStarted = false;
let gameWon = false;
let gameLose = false;
let win_sound = new Audio('./audio/win.mp3');
let lose_sound = new Audio('./audio/lose.mp3');

window.addEventListener('resize', () => {
    const button = document.querySelector('.button');
    if (window.innerWidth >= 600) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
});

function init() {
    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('start-screen');
    endScreen = document.getElementById('end-screen');
    mobileButtonsTop = document.getElementById('mobile-buttons-top');
    mobileButtonsBottom = document.getElementById('mobile-buttons-bottom');
    gameCondition(canvas, startScreen, endScreen, mobileButtonsTop, mobileButtonsBottom);
    checkOrientation();
}

function initLevel(level) {
    startLevel1(level);
}

function gameCondition(canvas, startScreen, endScreen, mobileButtonsTop, mobileButtonsBottom) {
    clearAllIntervals();
    if (isGameStarted) {
        initLevel(1);
        world = new World(canvas, keyboard, isGameStarted);
        disabledStartScreen(canvas, startScreen, mobileButtonsTop, mobileButtonsBottom);
    } else if(!isGameStarted && !gameWon && !gameLose) {
        enableStartScreen(canvas, startScreen, mobileButtonsTop, mobileButtonsBottom);
    } else if(!isGameStarted && gameLose || gameWon) {
        renderEndScreen(canvas, startScreen, endScreen, mobileButtonsTop, mobileButtonsBottom);
    }
}

function disabledStartScreen(canvas, startScreen, mobileButtonsTop, mobileButtonsBottom) {
    canvas.style.display = 'flex';
    startScreen.style.display = 'none';
    mobileButtonsTop.style.display = 'flex';
    mobileButtonsBottom.style.display = 'flex';
}

function enableStartScreen(canvas, startScreen, mobileButtonsTop, mobileButtonsBottom) {
    canvas.style.display = 'none';
    startScreen.style.display = 'flex';
    mobileButtonsTop.style.display = 'none';
    mobileButtonsBottom.style.display = 'none';
}

function enableEndScreen(canvas, endScreen, mobileButtonsTop, mobileButtonsBottom) {
    canvas.style.display = 'none';
    endScreen.style.display = 'flex';
    mobileButtonsTop.style.display = 'none';
    mobileButtonsBottom.style.display = 'none';
}

function renderEndScreen(canvas, startScreen, endScreen, mobileButtonsTop, mobileButtonsBottom) {
    let wonPfad = './img/9_intro_outro_screens/you_won_screen.png';
    let losePfad = './img/9_intro_outro_screens/game_over_screen.png';
    let pfad;
    if(gameWon) {
        pfad = wonPfad;
    } else if(gameLose) {
        pfad = losePfad;
    }
    disabledStartScreen(canvas, startScreen, mobileButtonsTop, mobileButtonsBottom);
    enableEndScreen(canvas, endScreen, mobileButtonsTop, mobileButtonsBottom);
    endScreen.style.backgroundImage = `url('${pfad}')`;
}

function startGame() {
    isGameStarted = true;
    if(gameLose || gameWon) {
        gameLose = false;
        gameWon = false;
        document.getElementById('end-screen').style.display = 'none';
    }
    init();
}

function stopGame() {
    isGameStarted = false;
    init();
}

function winGame() {
    world.level.enemies.forEach((enemy) => {
        if(enemy instanceof Endboss && enemy.energy == 0 && world.character.energy > 0) {
            gameWon = true;
            win_sound.play();
            stopGame();
        }
    });
}

function loseGame() {
    gameLose = true;
    lose_sound.play();
    stopGame();
}

function backHome() {
    isGameStarted = false;
    gameWon = false;
    gameLose = false;
    document.getElementById('end-screen').style.display = 'none';
    init();
}

function toggleOverlay() {
    let refOverlay = document.getElementById('overlay');
    let currentStyle = window.getComputedStyle(refOverlay).display;
    if(currentStyle == 'none') {
        refOverlay.style.display = 'flex'
    } else if(currentStyle == 'flex') {
        refOverlay.style.display = 'none'
    }
}

function handleOverlayClick(event) {
    const refOverlay = document.getElementById('overlay');
    const overlayContent = document.querySelector('.overlay-content');
    if (!overlayContent.contains(event.target)) {
        refOverlay.style.display = 'none';
    }
}

function startFullscreen() {
    let fullscreen = document.getElementById('fullscreen-container');
    enterFullscreen(fullscreen);
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen(element) {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

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