class Transform {
    position = [0.0, 0.0];
    rotation = 0.0;
    scale    = [1.0, 1.0];

    constructor() {
        this.position = glMatrix.vec2.fromValues(0, 0);
        this.rotation = 0.0; // radians
        this.scale    = glMatrix.vec2.fromValues(1, 1);
    }

    get height() { return this.scale[1]; }

    get position() { return this.position; }

    get rotation() { return this.rotation; }

    get scale() { return this.scale; }

    get width() { return this.scale[0]; }

    get x() { return this.position[0]; }

    get y() { return this.position[1]; }

    /**
     * @return {number} Rotation in degrees.
     */
    getRotationDegrees() {
        return this.rotation * (180.0 / Math.PI);
    }

    /**
     * @return {number[]} The underlying transform matrix.
     */
    getXform() {
        const matrix = glMatrix.mat4.create();

        glMatrix.mat4.translate(matrix, matrix, glMatrix.vec3.fromValues(this.position[0], this.position[1], 0.0));
        glMatrix.mat4.rotateZ(matrix, matrix, this.rotation);
        glMatrix.mat4.scale(matrix, matrix, glMatrix.vec3.fromValues(this.scale[0], this.scale[1], 1.0))

        return matrix;
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    setPosition(x, y) {
        this.position[0] = x;
        this.position[1] = y;
    }

    /**
     * @param {number} degrees
     */
    setRotationDegrees(degrees) {
        this.setRotationRads(degrees * Math.PI / 180.0);
    }

    /**
     * @param {number} radians
     */
    setRotationRads(radians) {
        this.rotation = radians;

        while (this.rotation > (2 * Math.PI)) {
            this.rotation -= (2 * Math.PI);
        }
    }

    /**
     * @param {number} width
     * @param {number} height
     */
    setSize(width, height) {
        this.scale[0] = width;
        this.scale[1] = height;
    }
}
