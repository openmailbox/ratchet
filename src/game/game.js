class Game {
    shader = null;

    constructor(htmlCanvasID) {
        Engine.Core.initializeWebGL(htmlCanvasID);

        this.shader = new SimpleShader("VertexShader", "FragmentShader");

        Engine.Core.clearCanvas([0.0, 0.8, 0.0, 1.0]);
        this.shader.activateShader();

        const gl = Engine.Core.getGL();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0.0, 4.0);
    }
}
