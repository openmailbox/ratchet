class Renderable {
    color  = [1, 1, 1, 1];
    shader = null;

    /**
     * @param {SimpleShader} shader
     */
    constructor(shader) {
        this.shader = shader;
        this.color  = [1, 1, 1, 1];
    }

    get color() {
        return this._color;
    }

    /**
     * @param {number[]} value
     */
    set color(value) {
        this._color = value;
    }

    draw(modelTransform) {
        const gl = Engine.Core.getGL();
        this.shader.activateShader(this.color);
        this.shader.loadObjectTransform(modelTransform);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}
