import { DefaultResources, Renderable, ResourceMap, Camera } from '../../engine/engine.js';

export class SceneFileParser {
    constructor(sceneFilePath) {
        this.sceneXml = ResourceMap.retrieveAsset(sceneFilePath);
    }

    parseCamera() {
        const camElm = this._getElm("Camera");
        const cx     = Number(camElm[0].getAttribute("CenterX"));
        const cy     = Number(camElm[0].getAttribute("CenterY"));
        const width  = Number(camElm[0].getAttribute("Width"));

        const viewport = camElm[0].getAttribute("Viewport").split(" ");
        const bgColor  = camElm[0].getAttribute("BgColor").split(" ");

        for (let i = 0; i < 4; i++) {
            bgColor[i]  = Number(bgColor[i]);
            viewport[i] = Number(viewport[i]);
        }

        const camera = new Camera(glMatrix.vec2.fromValues(cx, cy), width, viewport);
        camera.bgColor = bgColor;

        return camera;
    }

    parseSquares(sqSet) {
        const elm = this._getElm("Square");

        let x, y, w, h, r, c, sq;

        for (let i = 0; i < elm.length; i++) {
            x  = Number(elm.item(i).attributes.getNamedItem("PosX").value);
            y  = Number(elm.item(i).attributes.getNamedItem("PosY").value);
            w  = Number(elm.item(i).attributes.getNamedItem("Width").value);
            h  = Number(elm.item(i).attributes.getNamedItem("Height").value);
            r  = Number(elm.item(i).attributes.getNamedItem("Rotation").value);
            c  = elm.item(i).attributes.getNamedItem("Color").value.split(" ");
            sq = new Renderable(DefaultResources.ConstColorShader);

            for (let j = 0; j < 3; j++) {
                c[j] = Number(c[j]);
            }

            sq.color = c;
            sq.transform.setPosition(x, y);
            sq.transform.setRotationDegrees(r);
            sq.transform.setSize(w, h);

            sqSet.push(sq);
        }
    }

    /**
     * @param {string} tagElm
     * @returns {HTMLCollectionOf<Element>}
     */
    _getElm(tagElm) {
        const theElm = this.sceneXml.getElementsByTagName(tagElm);

        if (theElm.length === 0) {
            console.error(`Warning: Level element:[${tagElm}]: not found.`);
        }

        return theElm;
    }
}
