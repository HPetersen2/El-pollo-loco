class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    /**
     * The constructor starts the two functions that check the keystrokes or the touch buttons.
     */
    constructor() {
        this.bindKeyPressEvents();
        this.bindBtnPressEvents();
    }

    /**
     * This function checks whether the respective keys on the keyboard have been pressed.
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', (e) => {
            this.checkKeyRight('keydown', e);
            this.checkKeyLeft('keydown', e);
            this.checkKeySpace('keydown', e);
            this.checkKeyD('keydown', e);
        });
        window.addEventListener('keyup', (e) => {
            this.checkKeyRight('keyup', e);
            this.checkKeyLeft('keyup', e);
            this.checkKeySpace('keyup', e);
            this.checkKeyD('keyup', e);
        });
    }

    /**
     * This function checks whether the respective buttons have been pressed on the mobile device.
     */
    bindBtnPressEvents() {
        window.addEventListener('load', () => {
            this.checkTouchLeft();
            this.checkTouchRight();
            this.checkTouchSpace();
            this.checkTouchThrow();
        }); 
    }

    /**
     * This function checks whether the right arrow button has been pressed or released.
     * @param {string} condition - The status of the button is transferred here.
     * @param {string} e - event
     */
    checkKeyRight(condition, e) {
        if(condition == 'keydown') {
            if(e.keyCode == 39) {
                this.RIGHT = true;
            }
        } else {
            if(e.keyCode == 39) {
                this.RIGHT = false;
            }
        }
    }

    /**
     * This function checks whether the left arrow button has been pressed or released.
     * @param {string} condition - The status of the button is transferred here.
     * @param {string} e - event
     */
    checkKeyLeft(condition, e) {
        if(condition == 'keydown') {
            if(e.keyCode == 37) {
                this.LEFT = true;
            }
        } else {
            if(e.keyCode == 37) {
                this.LEFT = false;
            }
        }
    }

    /**
     * This function checks whether the space button has been pressed or released.
     * @param {string} condition - The status of the button is transferred here.
     * @param {string} e - event
     */
    checkKeySpace(condition, e) {
        if(condition == 'keydown') {
            if(e.keyCode == 32) {
                this.SPACE = true;
            }
        } else {
            if(e.keyCode == 32) {
                this.SPACE = false;
            }
        }
    }

    /**
     * This function checks whether the D button has been pressed or released.
     * @param {string} condition - The status of the button is transferred here.
     * @param {string} e - event
     */
    checkKeyD(condition, e) {
        if (condition == 'keydown') {
            if(e.keyCode == 68) {
                this.D = true;
            }
        } else {
            if(e.keyCode == 68) {
                this.D = false;
            }
        }
    }

    /**
     * This function checks whether the button on the left has been pressed on a mobile device.
     */
    checkTouchLeft() {
        document.getElementById('Btnleft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        }, {passive:false}); 
        document.getElementById('Btnleft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
    }

    /**
     * This function checks whether the button on the right has been pressed on a mobile device.
     */
    checkTouchRight() {
        document.getElementById('Btnright').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        }, {passive:false});

        document.getElementById('Btnright').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
    }

    /**
     * This function checks whether the button on the Space has been pressed on a mobile device.
     */
    checkTouchSpace() {
        document.getElementById('Btnup').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        }, {passive:false});

        document.getElementById('Btnup').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
    }

    /**
     * This function checks whether the throw button has been pressed on a mobile device.
     */
    checkTouchThrow() {
        document.getElementById('Btnthrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        }, {passive:false});

        document.getElementById('Btnthrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
    }

}