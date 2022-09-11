import { Core } from './core/core.js';

export class Camera {
    bgColor  = null;
    viewport = null;
    vpMatrix = null;
    wcCenter = null;

    constructor(wcCenter, wcWidth, viewportArray) {
        this.wcCenter  = wcCenter;
        this.wcWidth   = wcWidth;
        this.viewport  = viewportArray;
        this.nearPlane = 0;
        this.farPlane  = 1000;

        this.viewMatrix = glMatrix.mat4.create();
        this.projMatrix = glMatrix.mat4.create();
        this.vpMatrix   = glMatrix.mat4.create();

        this.bgColor = [0.8, 0.8, 0.8, 1];
    }

    get bgColor() { return this._bgColor; }

    /**
     * @param {number[]} value
     */
    set bgColor(value) { this._bgColor = value; }

    get viewport() { return this._viewport; }

    /**
     * @param {number[]} viewportArray
     */
    set viewport(viewportArray) { this._viewport = viewportArray; }

    get vpMatrix() { return this.vpMatrix; }

    get wcCenter() { return this.wcCenter; }

    /**
     * @param {number} value
     */
    set wcWidth(value) { this._wcWidth = value; }

    setWCCenter(x, y) {
        this.wcCenter[0] = x;
        this.wcCenter[1] = y;
    }

    setupViewProjection() {
        const gl           = Core.getGL();
        const halfWCWidth  = 0.5 * this._wcWidth;
        const halfWCHeight = halfWCWidth * this.viewport[3] / this.viewport[2];

        // x, y, width, height
        gl.viewport(this.viewport[0], this.viewport[1], this.viewport[2], this.viewport[3]);
        gl.scissor(this.viewport[0], this.viewport[1], this.viewport[2], this.viewport[3]);

        gl.clearColor(this.bgColor[0], this.bgColor[1], this.bgColor[2], this.bgColor[3]);

        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);

        glMatrix.mat4.lookAt(
            this.viewMatrix,
            [this.wcCenter[0], this.wcCenter[1], 10],
            [this.wcCenter[0], this.wcCenter[1], 0],
            [0, 1, 0] // orientation
        );

        // dist-to-left, dist-right, bottom, top, z-near, z-far
        glMatrix.mat4.ortho(this.projMatrix, -halfWCWidth, halfWCWidth, -halfWCHeight, halfWCHeight, this.nearPlane, this.farPlane);
        glMatrix.mat4.multiply(this.vpMatrix, this.projMatrix, this.viewMatrix);
    }
}
