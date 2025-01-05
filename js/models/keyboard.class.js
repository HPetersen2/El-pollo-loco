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
            if(e.keyCode == 39) {
                this.RIGHT = true;
            }
        
            if(e.keyCode == 37) {
                this.LEFT = true;
            }
        
            if(e.keyCode == 38) {
                this.UP = true;
            }
        
            if(e.keyCode == 40) {
                this.DOWN = true;
            }
        
            if(e.keyCode == 32) {
                this.SPACE = true;
            }
        
            if(e.keyCode == 68) {
                this.D = true;
            }
        });
        
        window.addEventListener('keyup', (e) => {
            if(e.keyCode == 39) {
                this.RIGHT = false;
            }
        
            if(e.keyCode == 37) {
                this.LEFT = false;
            }
        
            if(e.keyCode == 38) {
                this.UP = false;
            }
        
            if(e.keyCode == 40) {
                this.DOWN = false;
            }
        
            if(e.keyCode == 32) {
                this.SPACE = false;
            }
        
            if(e.keyCode == 68) {
                this.D = false;
            }
        });
    }

    /**
     * This function checks whether the respective buttons have been pressed on the mobile device.
     */
    bindBtnPressEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('Btnleft').addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.LEFT = true;
            });

            document.getElementById('Btnleft').addEventListener('touchend', (e) => {
                e.preventDefault();
                this.LEFT = false;
            });

            document.getElementById('Btnright').addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.RIGHT = true;
            });

            document.getElementById('Btnright').addEventListener('touchend', (e) => {
                e.preventDefault();
                this.RIGHT = false;
            });

            document.getElementById('Btnup').addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.SPACE = true;
            });

            document.getElementById('Btnup').addEventListener('touchend', (e) => {
                e.preventDefault();
                this.SPACE = false;
            });
            
            document.getElementById('Btnthrow').addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.D = true;
            });

            document.getElementById('Btnthrow').addEventListener('touchend', (e) => {
                e.preventDefault();
                this.D = false;
            });
        }); 
    }
}