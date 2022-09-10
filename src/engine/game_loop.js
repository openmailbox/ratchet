Engine.GameLoop = (function() {
    const FPS = 60;
    const MPF = 1000 / FPS;

    let previousTime, lagTime, currentTime, elapsedTime;

    let isLoopRunning = false;
    let game          = null;

    const start = function(newGame) {
        game          = newGame;
        previousTime  = Date.now();
        lagTime       = 0.0
        isLoopRunning = true;

        requestAnimationFrame(function() { _runLoop.call(game) });
    };

    const _runLoop = function() {
        if (isLoopRunning) {
            requestAnimationFrame(function() { _runLoop.call(game) });
        }

        currentTime  = Date.now();
        elapsedTime  = currentTime - previousTime;
        previousTime = currentTime;

        lagTime += elapsedTime;

        while ((lagTime >= MPF) && isLoopRunning) {
            this.update();
            lagTime -= MPF;
        }

        this.draw();
    };

    return {
        start: start
    };
})();
