Engine.VertexBuffer = (function() {
    const verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];

    let squareVertexBuffer = null;

    const initialize = function() {
        const gl = Engine.Core.getGL();

        squareVertexBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
    };

    return {
        getGLVertexRef: function() { return squareVertexBuffer; },
        initialize: initialize
    };
})();
