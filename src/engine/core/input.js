export class Input {
    static Keys = {
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
    }

    static {
        this.keyPreviousState = [];
        this._isKeyPressed    = [];
        this._isKeyClicked    = [];
    }

    static initialize() {
        for (let i = 0; i < this.Keys.LastKeyCode; i++) {
            this._isKeyPressed[i]     = false;
            this.keyPreviousState[i] = false;
            this._isKeyClicked[i]     = false;
        }

        window.addEventListener('keydown', _onKeyDown.bind(this));
        window.addEventListener('keyup', _onKeyUp.bind(this));
    }

    static isKeyClicked(keyCode) {
        return this._isKeyClicked[keyCode];
    }

    static isKeyPressed(keyCode) {
        return this._isKeyPressed[keyCode];
    }

    static update() {
        for (let i = 0; i < this.Keys.LastKeyCode; i++) {
            this._isKeyClicked[i]    = (!this.keyPreviousState[i]) && this._isKeyPressed[i];
            this.keyPreviousState[i] = this._isKeyPressed[i];
        }
    }
}

function _onKeyDown(event) {
    this._isKeyPressed[event.keyCode] = true;
};

function _onKeyUp(event) {
    this._isKeyPressed[event.keyCode] = false;
};
