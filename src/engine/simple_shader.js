class SimpleShader {
    compiledShader    = null;
    modelTransform    = null;
    pixelColor        = null;
    viewProjTransform = null;

    #shaderVertexPositionAttribute = null;

    constructor(vertexShaderID, fragmentShaderID) {
        const gl             = Engine.Core.getGL();
        const fragmentShader = this._loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);
        const vertexShader   = this._loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);

        this.compiledShader = gl.createProgram();

        gl.attachShader(this.compiledShader, vertexShader);
        gl.attachShader(this.compiledShader, fragmentShader);
        gl.linkProgram(this.compiledShader);

        if (!gl.getProgramParameter(this.compiledShader, gl.LINK_STATUS)) {
            alert("Error linking shader");
            return null;
        }

        this.#shaderVertexPositionAttribute = gl.getAttribLocation(this.compiledShader, "aSquareVertexPosition");

        this.pixelColor        = gl.getUniformLocation(this.compiledShader, "uPixelColor");
        this.modelTransform    = gl.getUniformLocation(this.compiledShader, "uModelTransform");
        this.viewProjTransform = gl.getUniformLocation(this.compiledShader, "uViewProjTransform");

        gl.bindBuffer(gl.ARRAY_BUFFER, Engine.VertexBuffer.getGLVertexRef());
        gl.vertexAttribPointer(this.#shaderVertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    }

    activateShader(pixelColor, vpMatrix) {
        const gl = Engine.Core.getGL();
        gl.useProgram(this.compiledShader);
        gl.uniformMatrix4fv(this.viewProjTransform, false, vpMatrix);
        gl.enableVertexAttribArray(this.#shaderVertexPositionAttribute);
        gl.uniform4fv(this.pixelColor, pixelColor);
    }

    loadObjectTransform(modelTransform) {
        const gl = Engine.Core.getGL();
        gl.uniformMatrix4fv(this.modelTransform, false, modelTransform);
    }

    get shader() {
        return this.compiledShader;
    }

    _loadAndCompileShader(filePath, shaderType) {
        let shaderSource, compiledShader;
        let gl = Engine.Core.getGL();

        const xmlReq = new XMLHttpRequest();
        xmlReq.open('GET', filePath, false);

        try {
            xmlReq.send();
        } catch (error) {
            alert(`Failed to load shader: ${filePath}`);
            return null;
        }

        shaderSource = xmlReq.responseText;
        if (shaderSource === null) {
            console.warn(`Failed to load shader ${filePath}`);
            return null;
        }

        compiledShader = gl.createShader(shaderType);

        gl.shaderSource(compiledShader, shaderSource);
        gl.compileShader(compiledShader);

        if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
            alert(`Shared compiling error: ${gl.getShaderInfoLog(compiledShader)}`)
        }

        return compiledShader;
    }
};
