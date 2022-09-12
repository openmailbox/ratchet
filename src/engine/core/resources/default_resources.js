import { SimpleShader } from "../../simple_shader.js";
import { TextFileLoader } from "./text_file_loader.js";
import { ResourceMap } from "./resource_map.js";

export class DefaultResources {
    static SimpleVS = 'src/shaders/simple_vs.glsl';
    static SimpleFS = 'src/shaders/simple_fs.glsl';

    static ConstColorShader = null;

    static initialize(callbackFunction) {
        TextFileLoader.loadTextFile(this.SimpleVS, TextFileLoader.TextFileType.text);
        TextFileLoader.loadTextFile(this.SimpleFS, TextFileLoader.TextFileType.text);

        ResourceMap.setLoadCompleteCallback(function() {
            this._createShaders(callbackFunction);
        }.bind(this));
    }

    static _createShaders(callbackFunction) {
        this.ConstColorShader = new SimpleShader(this.SimpleVS, this.SimpleFS);
        callbackFunction();
    }
}
