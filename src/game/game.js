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

        const xform = glMatrix.mat4.create();
        glMatrix.mat4.translate(xform, xform, glMatrix.vec3.fromValues(-0.25, 0.25, 0.0));
        glMatrix.mat4.rotateZ(xform, xform, 0.2);
        glMatrix.mat4.scale(xform, xform, glMatrix.vec3.fromValues(1.2, 1.2, 1.0));

        this.whiteSq.draw(xform);

        glMatrix.mat4.identity(xform);
        glMatrix.mat4.translate(xform, xform, glMatrix.vec3.fromValues(0.25, -0.25, 0.0));
        glMatrix.mat4.rotateZ(xform, xform, -0.785);
        glMatrix.mat4.scale(xform, xform, glMatrix.vec3.fromValues(0.4, 0.4, 1.0));

        this.redSq.draw(xform);

        const gl = Engine.Core.getGL();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0.0, 4.0);
    }
}
