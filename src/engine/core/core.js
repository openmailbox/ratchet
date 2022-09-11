const Engine = {};

Engine.Core = (function() {
    let webGL = null;

    const clearCanvas = function(color) {
        webGL.clearColor(color[0], color[1], color[2], color[3]);
        webGL.clear(webGL.COLOR_BUFFER_BIT);
    };

    const initialize = function(htmlCanvasID) {
        _initializeWebGL(htmlCanvasID);
        Engine.VertexBuffer.initialize();
        Engine.Input.initialize();
    };

    const _initializeWebGL = function(canvasID) {
        let canvas = document.getElementById(canvasID);

        webGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (webGL === null) {
            document.write("<br><b>WebGL is not supported.</b></br>")
        }
    };

    return {
        clearCanvas: clearCanvas,
        getGL: function() { return webGL; },
        initialize: initialize
    }
})();
