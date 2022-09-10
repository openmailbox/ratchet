class Game {
    shader = null;

    constructor(htmlCanvasID) {
        Engine.Core.initializeWebGL(htmlCanvasID);

        this.shader = new SimpleShader("src/shaders/simple_vs.glsl", "src/shaders/simple_fs.glsl");

        Engine.Core.clearCanvas([0.0, 0.8, 0.0, 1.0]);
        this.shader.activateShader([0, 0, 1, 1]);

        const gl = Engine.Core.getGL();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0.0, 4.0);
    }
}
