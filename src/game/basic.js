import {
    Core,
    DefaultResources,
    Input,
    Renderable,
    TextFileLoader
} from '../engine/engine.js';

import { SceneFileParser } from './util/scene_file_parser.js';

export class BasicGame {
    constructor() {
        this.sceneFile = 'assets/scene.xml';
        this.sqSet     = new Array();
        this.camera    = null;
    }

    draw() {
        Core.clearCanvas([0.9, 0.9, 0.9, 1]);

        this.camera.setupViewProjection();

        this.blueSq.draw(this.camera.vpMatrix);
        this.tlSq.draw(this.camera.vpMatrix);
        this.trSq.draw(this.camera.vpMatrix);
        this.blSq.draw(this.camera.vpMatrix);
        this.brSq.draw(this.camera.vpMatrix);

        for (const square of this.sqSet) {
            square.draw(this.camera.vpMatrix);
        }
    }

    initialize() {
        const sceneParser = new SceneFileParser(this.sceneFile);

        this.camera = sceneParser.parseCamera();

        sceneParser.parseSquares(this.sqSet);

        this.constColorShader = DefaultResources.ConstColorShader;
        this.blueSq           = new Renderable(this.constColorShader);
        this.tlSq             = new Renderable(this.constColorShader);
        this.trSq             = new Renderable(this.constColorShader);
        this.brSq             = new Renderable(this.constColorShader);
        this.blSq             = new Renderable(this.constColorShader);

        this.blueSq.color  = [0.25, 0.25, 0.95, 1];
        this.tlSq.color    = [0.9, 0.1, 0.1, 1];
        this.trSq.color    = [0.1, 0.9, 0.1, 1];
        this.brSq.color    = [0.1, 0.1, 0.9, 1];
        this.blSq.color    = [0.1, 0.1, 0.1, 1];

        this.blueSq.transform.setPosition(20, 60);
        this.blueSq.transform.setRotationRads(0.2);
        this.blueSq.transform.setSize(5, 5);

        this.tlSq.transform.setPosition(10, 65);

        this.trSq.transform.setPosition(30, 65);

        this.brSq.transform.setPosition(30, 55);

        this.blSq.transform.setPosition(10, 55);
    }

    loadScene() {
        TextFileLoader.loadTextFile(this.sceneFile, TextFileLoader.TextFileType.xml);
    }

    unloadScene() {
        TextFileLoader.unloadTextFile(this.sceneFile);
    }

    update() {
        const whiteXform = this.sqSet[0].transform;
        const redXform   = this.sqSet[1].transform;
        const deltaX     = 0.05;

        if (Input.isKeyPressed(Input.Keys.Right)) {
            if (whiteXform.x > 30) {
                whiteXform.setPosition(10, 60);
            }

            whiteXform.setPosition(whiteXform.x + deltaX, whiteXform.y);
        }

        if (Input.isKeyClicked(Input.Keys.Up)) {
            whiteXform.setRotationDegrees(whiteXform.getRotationDegrees() + 1);
        }

        if (Input.isKeyPressed(Input.Keys.Down)) {
            if (redXform.width > 5) {
                redXform.setSize(2, 2);
            }

            redXform.setSize(redXform.width + deltaX, redXform.height + deltaX);
        }
    }
}
