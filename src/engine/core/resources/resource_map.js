export class ResourceMap {
    static {
        this._resourceMap          = {};
        this._numOutstandingLoads  = 0;
        this._loadCompleteCallback = null;
    }

    static asyncLoadCompleted(name, loadedAsset) {
        if (!this.isAssetLoaded(name)) {
            alert(`Engine.asyncLoadCompleted: [${name}] not in resource map.`);
        }

        this._resourceMap[name].asset = loadedAsset;
        --this._numOutstandingLoads;
        this._checkForAllLoadCompleted();
    }

    static asyncLoadRequested(name) {
        this._resourceMap[name] = new MapEntry(name);
        ++this._numOutstandingLoads;
    }

    static isAssetLoaded(name) {
        return (name in this._resourceMap);
    }

    static retrieveAsset(name) {
        if (name in this._resourceMap) {
            return this._resourceMap[name].asset;
        } else {
            return null;
        }
    }

    static setLoadCompleteCallback(funct) {
        this._loadCompleteCallback = funct;
        this._checkForAllLoadCompleted();
    }

    static unloadAsset(name) {
        if (name in this._resourceMap) {
            delete this._resourceMap[name];
        }
    }

    static _checkForAllLoadCompleted() {
        if (this._numOutstandingLoads === 0 && this._loadCompleteCallback !== null) {
            const funToCall = this._loadCompleteCallback;
            this._loadCompleteCallback = null;
            funToCall();
        }
    }
}

class MapEntry {
    asset = null;

    constructor(name) {
        this.asset = name;
    }
}
