class SimpleShader {
    compiledShader = null;
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

        gl.bindBuffer(gl.ARRAY_BUFFER, Engine.VertexBuffer.getGLVertexRef());
        gl.vertexAttribPointer(this.#shaderVertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    }

    activateShader() {
        const gl = Engine.Core.getGL();
        gl.useProgram(this.compiledShader);
        gl.enableVertexAttribArray(this.#shaderVertexPositionAttribute);
    }

    get shader() {
        return this.compiledShader;
    }

    _loadAndCompileShader(id, shaderType) {
        let shaderText, shaderSource, compiledShader;
        let gl = Engine.Core.getGL();

        shaderText = document.getElementById(id);
        shaderSource = shaderText.firstChild.textContent;

        compiledShader = gl.createShader(shaderType);

        gl.shaderSource(compiledShader, shaderSource);
        gl.compileShader(compiledShader);

        if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
            alert(`Shared compiling error: ${gl.getShaderInfoLog(compiledShader)}`)
        }

        return compiledShader;
    }
};
