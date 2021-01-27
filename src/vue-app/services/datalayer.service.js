import { ipcRenderer } from "electron";

export default class DatalayerService {
    constructor(changedKeyHandler, mapReadyhandler) {
        this.mapReadyhandler = mapReadyhandler;
        this.changedKeyHandler = changedKeyHandler;
        this.dimensions = [20,20];
        this.selectedCell = "";
        this.keyMap = {};
        this.arrayMap = [];

        ipcRenderer.on("getmap-reply", (evt, map) => {
            this.buildOrFetchKeyMap(map);
        });

        this.initMap();
    }

    initMap() {
        ipcRenderer.send("getmap", this.dimensions);
    }

    saveMap() {
        ipcRenderer.send("updatemap", this.keyMap);
    }

    saveCell({keys, data}) {
        keys.forEach(key => {
            this.keyMap[key] = Object.assign(this.keyMap[key], data);
            console.log("updated", {key, data: this.keyMap[key]});
            this.changedKeyHandler({ key, data: this.keyMap[key] });
        });
        this.saveMap();
    }

    updateBlocked({key, dir}) {
        this.keyMap[key][dir] = !this.keyMap[key][dir];
        this.changedKeyHandler({ key, data: this.keyMap[key] });
        this.saveMap();
    }

    buildOrFetchKeyMap(mapData) {
        this.keyMap = mapData;
        this.buildArrays(mapData);
    }

    buildArrays(mapData) {
        let rows = Array.apply(null, {
            length: this.dimensions[1]
        }).map(() => []);
        let cols = Array.apply(null, {
            length: this.dimensions[0]
        }).map(() => []);

        this.arrayMap = rows.map((rElem, ri) => {
            return cols.map((cElem, ci) => {
                let key = `${ci + 1}-${ri + 1}`;
                let cell = this.keyMap[key];
                return cell;
            });
        });
        this.mapReadyhandler(this.arrayMap);
    }
}
