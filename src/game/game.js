class Game {
    constColorShader = null;
    redSq            = null;
    whiteSq          = null;

    constructor(htmlCanvasID) {
        Engine.Core.initializeWebGL(htmlCanvasID);

        const gl = Engine.Core.getGL();

        this.constColorShader = new SimpleShader("src/shaders/simple_vs.glsl", "src/shaders/simple_fs.glsl");
        this.blueSq           = new Renderable(this.constColorShader);
        this.redSq            = new Renderable(this.constColorShader);
        this.tlSq             = new Renderable(this.constColorShader);
        this.trSq             = new Renderable(this.constColorShader);
        this.brSq             = new Renderable(this.constColorShader);
        this.blSq             = new Renderable(this.constColorShader);

        this.blueSq.color  = [0.25, 0.25, 0.95, 1];
        this.redSq.color   = [1, 0.25, 0.25, 1];
        this.tlSq.color    = [0.9, 0.1, 0.1, 1];
        this.trSq.color    = [0.1, 0.9, 0.1, 1];
        this.brSq.color    = [0.1, 0.1, 0.9, 1];
        this.blSq.color    = [0.1, 0.1, 0.1, 1];

        Engine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

        // x, y, width, height
        gl.viewport(20, 40, 600, 300);
        gl.scissor(20, 40, 600, 300);

        gl.enable(gl.SCISSOR_TEST);
        Engine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]);
        gl.disable(gl.SCISSOR_TEST);

        const viewMatrix = glMatrix.mat4.create();
        const projMatrix = glMatrix.mat4.create();
        const vpMatrix   = glMatrix.mat4.create();

        glMatrix.mat4.lookAt(viewMatrix,
            [20, 60, 10], // camera
            [20, 60, 0],  // look at
            [0, 1, 0]);   // orientation

        // dist-to-left, dist-right, bottom, top, z-near, z-far
        glMatrix.mat4.ortho(projMatrix, -10, 10, -5, 5, 0, 1000)

        glMatrix.mat4.multiply(vpMatrix, projMatrix, viewMatrix);

        this.blueSq.transform.setPosition(20, 60);
        this.blueSq.transform.setRotationRads(0.2);
        this.blueSq.transform.setSize(5, 5);
        this.blueSq.draw(vpMatrix);

        this.redSq.transform.setPosition(20, 60);
        this.redSq.transform.setSize(2, 2);
        this.redSq.draw(vpMatrix);

        this.tlSq.transform.setPosition(10, 65);
        this.tlSq.draw(vpMatrix);

        this.trSq.transform.setPosition(30, 65);
        this.trSq.draw(vpMatrix);

        this.brSq.transform.setPosition(30, 55);
        this.brSq.draw(vpMatrix);

        this.blSq.transform.setPosition(10, 55);
        this.blSq.draw(vpMatrix);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0.0, 4.0);
    }
}
