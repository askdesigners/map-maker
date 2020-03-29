import { ipcRenderer } from "electron";

export default class DatalayerService {
    constructor() {
        this.dimensions = [66, 50];
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

    updateSelection(key) {
        console.log("update selection in service");
        this.selectedCell = key;
        this.emit("selectionChange", this.selectedCell);
    }

    saveMap() {
        ipcRenderer.send("updatemap", this.keyMap);
    }

    saveCell(key, data) {
        console.log("save selection in service:", key, data);
        this.keyMap[key] = Object.assign(this.keyMap[key], data);
        this.emit("changedKey", { key, data: this.keyMap[key] });
        this.saveMap();
    }

    updatedBlocked(key, dir) {
        this.keyMap[key][dir] = !this.keyMap[key][dir];
        this.emit("changedKey", { key, data: this.keyMap[key] });
        this.saveMap();
    }

    getDimensions() {
        return this.dimensions;
    }

    buildOrFetchKeyMap(mapData) {
        this.keyMap = mapData;
        this.buildArrays(mapData);
    }

    buildArrays(mapData) {
        console.log("building arrays");
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

        this.emit("mapReady", this.arrayMap);
    }
}
