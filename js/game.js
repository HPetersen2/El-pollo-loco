let canvas;
let world;
let keyboard = new Keyboard();
let isGameStarted = true;

function init() {
    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('start-screen');
    gameCondition(canvas, startScreen);
    checkOrientation();
}

function gameCondition(canvas, startScreen) {
    let mobileButtonsTop = document.getElementById('mobile-buttons-top')
    let mobileButtonsBottom = document.getElementById('mobile-buttons-bottom')
    if(isGameStarted) {
        canvas.style.display = 'block';
        startScreen.style.display = 'none';
        startLevel1();
        mobileButtonsTop.style.display = 'flex';
        mobileButtonsBottom.style.display = 'flex';
        world = new World(canvas, keyboard, isGameStarted);
    } else if(!isGameStarted) {
        clearAllIntervals();
        canvas.style.display = 'none';
        startScreen.style.display = 'flex';
        mobileButtonsTop.style.display = 'none';
        mobileButtonsBottom.style.display = 'none';
    }
}

function startGame() {
    isGameStarted = true;
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

function endGame() {
    isGameStarted = false;
    init();
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