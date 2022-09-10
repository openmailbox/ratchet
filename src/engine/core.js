const Engine = {};

Engine.Core = (function() {
    let webGL = null;

    const clearCanvas = function(color) {
        webGL.clearColor(color[0], color[1], color[2], color[3]);
        webGL.clear(webGL.COLOR_BUFFER_BIT);
    };

    const initializeWebGL = function(canvasID) {
        let canvas = document.getElementById(canvasID);

        webGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (webGL === null) {
            document.write("<br><b>WebGL is not supported.</b></br>")
            return;
        }

        Engine.VertexBuffer.initialize();
    };

    return {
        clearCanvas: clearCanvas,
        getGL: function() { return webGL; },
        initializeWebGL: initializeWebGL
    }
})();
