class Game {
    constColorShader = null;
    redSq            = null;
    whiteSq          = null;

    constructor(htmlCanvasID) {
        Engine.Core.initializeWebGL(htmlCanvasID);

        this.constColorShader = new SimpleShader("src/shaders/simple_vs.glsl", "src/shaders/simple_fs.glsl");
        this.redSq            = new Renderable(this.constColorShader);
        this.whiteSq          = new Renderable(this.constColorShader);

        this.redSq.color   = [1, 0, 0, 1];
        this.whiteSq.color = [1, 1, 1, 1];

        Engine.Core.clearCanvas([0.0, 0.8, 0.0, 1.0]);

        this.whiteSq.draw();
        this.redSq.draw();

        const gl = Engine.Core.getGL();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0.0, 4.0);
    }
}
