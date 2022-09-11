import { ResourceMap } from "./resource_map.js"

export class TextFileLoader {
    static TextFileType = Object.freeze({
        xml:  0,
        text: 1
    })

    static loadTextFile(fileName, fileType, callbackFunction) {
        if (ResourceMap.isAssetLoaded(fileName)) {
            if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
                callbackFunction(fileName);
            }
            return;
        }

        ResourceMap.asyncLoadRequested(fileName);

        const req = new XMLHttpRequest();

        req.open('GET', fileName, true);
        req.setRequestHeader('Content-Type', 'text/xml');

        req.onreadystatechange = function() {
            if ((req.readyState === 4) && (req.status !== 200)) {
                alert(`${fileName}: loading failed.`);
            }
        };

        req.onload = function() {
            let fileContent = null;

            if (fileType === this.TextFileType.xml) {
                const parser = new DOMParser();
                fileContent = parser.parseFromString(req.responseText, 'text/xml');
            } else {
                fileContent = req.responseText;
            }

            ResourceMap.asyncLoadCompleted(fileName, fileContent);

            if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
                callbackFunction(fileName);
            }
        }.bind(this);

        req.send();
    }

    static unloadTextFile(fileName) {
        ResourceMap.unloadAsset(fileName);
    }
}