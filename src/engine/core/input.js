Engine.Input = (function() {
    const Keys = {
        Left:  37,
        Up:    38,
        Right: 39,
        Down:  40,

        Space: 32,

        Zero:  48,
        One:   49,
        Two:   50,
        Three: 51,
        Four:  52,
        Five:  53,
        Six:   54,
        Seven: 55,
        Eight: 56,
        Nine:  57,

        A: 65,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        R: 82,
        S: 83,
        W: 87,

        LastKeyCode: 222
    };

    let keyPreviousState = [];
    let isKeyPressed     = [];
    let isKeyClicked     = [];

    const initialize = function() {
        for (let i = 0; i < Keys.LastKeyCode; i++) {
            isKeyPressed[i]     = false;
            keyPreviousState[i] = false;
            isKeyClicked[i]     = false;
        }

        window.addEventListener('keyup', _onKeyUp);
        window.addEventListener('keydown', _onKeyDown);
    };

    const update = function() {
        for (let i = 0; i < Keys.LastKeyCode; i++) {
            isKeyClicked[i]     = (!keyPreviousState[i]) && isKeyPressed[i];
            keyPreviousState[i] = isKeyPressed[i];
        }
    };

    const _onKeyDown = function(event) {
        isKeyPressed[event.keyCode] = true;
    };

    const _onKeyUp = function(event) {
        isKeyPressed[event.keyCode] = false;
    };

    return {
        initialize: initialize,
        isKeyPressed: (keyCode) => { return isKeyPressed[keyCode]; },
        isKeyClicked: (keyCode) => { return isKeyClicked[keyCode]; },
        Keys: Keys,
        update: update
    };
})();
