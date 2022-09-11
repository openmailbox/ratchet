import { Input } from './input.js'

const FPS = 60;
const MPF = 1000 / FPS;

let previousTime, lagTime, currentTime, elapsedTime;

let isLoopRunning = false;
let game          = null;

export class GameLoop {
    static start(newGame) {
        game          = newGame;
        previousTime  = Date.now();
        lagTime       = 0.0
        isLoopRunning = true;

        requestAnimationFrame(function() { _runLoop.call(game) });
    }
}

function _runLoop() {
    if (isLoopRunning) {
        requestAnimationFrame(function () { _runLoop.call(game) });
    }

    currentTime = Date.now();
    elapsedTime = currentTime - previousTime;
    previousTime = currentTime;

    lagTime += elapsedTime;

    while ((lagTime >= MPF) && isLoopRunning) {
        Input.update();
        this.update();
        lagTime -= MPF;
    }

    this.draw();
}
