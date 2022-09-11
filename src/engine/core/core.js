import { Input } from './input.js'
import { VertexBuffer } from './vertex_buffer.js';

export class Core {
    static {
        this._webGL = null;
    }

    static clearCanvas(color) {
        this._webGL.clearColor(color[0], color[1], color[2], color[3]);
        this._webGL.clear(this._webGL.COLOR_BUFFER_BIT);
    }

    static getGL() {
        return this._webGL;
    }

    static initialize(htmlCanvasID) {
        this._webGL = _initializeWebGL(htmlCanvasID);

        Input.initialize();
        VertexBuffer.initialize();
    }
}

function _initializeWebGL(canvasID) {
    let canvas = document.getElementById(canvasID);
    let gl     = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (gl === null) {
        document.write("<br><b>WebGL is not supported.</b></br>")
    }

    return gl;
}
