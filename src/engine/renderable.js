import { Core } from './core/core.js';
import { Transform } from './transform.js';

/**
 * @property {SimpleShader} shader
 */
export class Renderable {
    color     = [1, 1, 1, 1];
    shader    = null;
    transform = new Transform();

    /**
     * @param {SimpleShader} shader
     */
    constructor(shader) {
        this.shader = shader;
    }

    get color() {
        return this._color;
    }

    get transform() {
        return this.transform;
    }

    /**
     * @param {number[]} value
     */
    set color(value) {
        this._color = value;
    }

    draw(vpMatrix) {
        const gl = Core.getGL();
        this.shader.activateShader(this.color, vpMatrix);
        this.shader.loadObjectTransform(this.transform.getXform());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}
