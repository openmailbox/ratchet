import * as Engine from '/src/engine/engine.js';

export class BasicGame {
    constructor(htmlCanvasID) {
        Engine.Core.initialize(htmlCanvasID);
        this.initialize();
    }

    draw() {
        Engine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);

        this.camera.setupViewProjection();

        this.blueSq.draw(this.camera.vpMatrix);
        this.whiteSq.draw(this.camera.vpMatrix);
        this.redSq.draw(this.camera.vpMatrix);

        this.tlSq.draw(this.camera.vpMatrix);
        this.trSq.draw(this.camera.vpMatrix);
        this.blSq.draw(this.camera.vpMatrix);
        this.brSq.draw(this.camera.vpMatrix);
    }

    initialize() {
        this.camera = new Engine.Camera(
            glMatrix.vec2.fromValues(20, 60), // center
            20,                               // width
            [20, 40, 600, 300]                // viewport(orgX, orgY, width, height)
        );

        this.camera.bgColor   = [0.8, 0.8, 0.8, 1];
        this.constColorShader = new Engine.SimpleShader("src/shaders/simple_vs.glsl", "src/shaders/simple_fs.glsl");
        this.whiteSq          = new Engine.Renderable(this.constColorShader);
        this.blueSq           = new Engine.Renderable(this.constColorShader);
        this.redSq            = new Engine.Renderable(this.constColorShader);
        this.tlSq             = new Engine.Renderable(this.constColorShader);
        this.trSq             = new Engine.Renderable(this.constColorShader);
        this.brSq             = new Engine.Renderable(this.constColorShader);
        this.blSq             = new Engine.Renderable(this.constColorShader);

        this.whiteSq.color = [1, 1, 1, 1];
        this.blueSq.color  = [0.25, 0.25, 0.95, 1];
        this.redSq.color   = [1, 0.25, 0.25, 1];
        this.tlSq.color    = [0.9, 0.1, 0.1, 1];
        this.trSq.color    = [0.1, 0.9, 0.1, 1];
        this.brSq.color    = [0.1, 0.1, 0.9, 1];
        this.blSq.color    = [0.1, 0.1, 0.1, 1];

        this.whiteSq.transform.setPosition(20, 60);
        this.whiteSq.transform.setRotationRads(0.2);
        this.whiteSq.transform.setSize(5, 5);

        this.blueSq.transform.setPosition(20, 60);
        this.blueSq.transform.setRotationRads(0.2);
        this.blueSq.transform.setSize(5, 5);

        this.redSq.transform.setPosition(20, 60);
        this.redSq.transform.setSize(2, 2);

        this.tlSq.transform.setPosition(10, 65);

        this.trSq.transform.setPosition(30, 65);

        this.brSq.transform.setPosition(30, 55);

        this.blSq.transform.setPosition(10, 55);

        Engine.GameLoop.start(this);
    }

    update() {
        const whiteXform = this.whiteSq.transform;
        const redXform   = this.redSq.transform;
        const deltaX     = 0.05;

        if (Engine.Input.isKeyPressed(Engine.Input.Keys.Right)) {
            if (whiteXform.x > 30) {
                whiteXform.setPosition(10, 60);
            }

            whiteXform.setPosition(whiteXform.x + deltaX, whiteXform.y);
        }

        if (Engine.Input.isKeyClicked(Engine.Input.Keys.Up)) {
            whiteXform.setRotationDegrees(whiteXform.getRotationDegrees() + 1);
        }

        if (Engine.Input.isKeyPressed(Engine.Input.Keys.Down)) {
            if (redXform.width > 5) {
                redXform.setSize(2, 2);
            }

            redXform.setSize(redXform.width + deltaX, redXform.height + deltaX);
        }
    }
}
