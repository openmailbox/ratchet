import { Core } from './core.js'

export class VertexBuffer {
    static {
        this._verticesOfSquare = [
            0.5, 0.5, 0.0,
            -0.5, 0.5, 0.0,
            0.5, -0.5, 0.0,
            -0.5, -0.5, 0.0
        ];

        this._squareVertexBuffer = null;
    }

    static getGLVertexRef() {
        return this._squareVertexBuffer;
    }

    static initialize() {
        const gl = Core.getGL();

        this._squareVertexBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this._squareVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._verticesOfSquare), gl.STATIC_DRAW);
    }
}
