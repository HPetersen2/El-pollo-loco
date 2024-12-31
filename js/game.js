let canvas;
let world;
let keyboard = new Keyboard();
let isGameStarted = false;

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
        world = new World(canvas, keyboard);
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

function toggleHelpContainer() {
    let refHelpContainer = document.getElementById('information-container');
    let currentStyle = window.getComputedStyle(refHelpContainer).display;
    
    if(currentStyle == 'none') {
        refHelpContainer.style.display = 'flex'
    } else if(currentStyle == 'flex') {
        refHelpContainer.style.display = 'none'
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