class Transform {
    position = null;
    rotation = null;
    scale    = null;

    constructor() {
        this.position = glMatrix.vec2.fromValues(0, 0);
        this.rotation = 0.0; // radians
        this.scale    = glMatrix.vec2.fromValues(1, 1);
    }

    getXform() {
        const matrix = glMatrix.mat4.create();

        glMatrix.mat4.translate(matrix, matrix, glMatrix.vec3.fromValues(this.position[0], this.position[1], 0.0));
        glMatrix.mat4.rotateZ(matrix, matrix, this.rotation);
        glMatrix.mat4.scale(matrix, matrix, glMatrix.vec3.fromValues(this.scale[0], this.scale[1], 1.0))

        return matrix;
    }

    get position() { return this.position; }

    get rotation() { return this.rotation; }

    get scale() { return this.scale; }

    setPosition(x, y) {
        this.position[0] = x;
        this.position[1] = y;
    }

    setRotationDegrees(degrees) {
        this.setRotationRads(degrees * Math.PI / 180.0);
    }

    setRotationRads(radians) {
        this.rotation = radians;

        while (this.rotation > (2 * Math.PI)) {
            this.rotation -= (2 * Math.PI);
        }
    }

    setSize(width, height) {
        this.scale[0] = width;
        this.scale[1] = height;
    }
}
