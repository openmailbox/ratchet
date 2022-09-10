class Renderable {
    color     = null;
    shader    = null;
    transform = null;

    /**
     * @param {SimpleShader} shader
     */
    constructor(shader) {
        this.color     = [1, 1, 1, 1];
        this.shader    = shader;
        this.transform = new Transform();
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
        const gl = Engine.Core.getGL();
        this.shader.activateShader(this.color, vpMatrix);
        this.shader.loadObjectTransform(this.transform.getXform());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}
