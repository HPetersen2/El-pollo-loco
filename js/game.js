let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    startGame();
    world = new World(canvas, keyboard);
    checkOrientation();
}

function startFullscreen() {
    let fullscreen = document.getElementById('fullscreen-container');
    enterFullscreen(fullscreen);
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