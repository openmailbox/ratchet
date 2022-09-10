class Game {
    constColorShader = null;
    redSq            = null;
    whiteSq          = null;

    constructor(htmlCanvasID) {
        Engine.Core.initializeWebGL(htmlCanvasID);

        this.camera = new Camera(
            glMatrix.vec2.fromValues(20, 60), // center
            20,                               // width
            [20, 40, 600, 300]                // viewport(orgX, orgY, width, height)
        );

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

        this.camera.setupViewProjection();

        const vpMatrix = this.camera.vpMatrix;

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

        const gl = Engine.Core.getGL();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0.0, 4.0);
    }
}
