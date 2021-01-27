import jsonfile from "jsonfile";
import path from "path";

export default class MapManager {
    constructor(ipcMain, jsonMapPath) {
        this.ipcBus = ipcMain;
        this.mapFilePath = jsonMapPath;
        ipcMain.on("getmap", this.getMap.bind(this));
        ipcMain.on("updatemap", this.updateMap.bind(this));
    }

    getMap(event, dimensions) {
        let emptyMap = this.buildEmptyMap(dimensions);
        const formattedMapData = this.formatForApp(emptyMap, jsonfile.readFileSync(path.join(__dirname, this.mapFilePath)).map);
        event.sender.send("getmap-reply", formattedMapData);
    }

    updateMap(event, newMapData) {
        return jsonfile.writeFileSync(path.join(__dirname, this.mapFilePath), this.formatForSave(newMapData));
    }

    buildEmptyMap(dimensions) {
        let rows = Array.apply(null, { length: dimensions[1] }).map(() => []);
        let cols = Array.apply(null, { length: dimensions[0] }).map(() => []);
        let newMap = {};

        rows.map((rElem, ri) => {
            return cols.map((cElem, ci) => {
                let key = `${ci + 1}-${ri + 1}`;
                newMap[key] = {
                    key,
                    level: "",
                    name: "",
                    descriptiveName: "",
                    description: "",
                    w: false,
                    e: false,
                    n: false,
                    s: false,
                    onEnter: "",
                    canEnter: "",
                    onLeave: "",
                };
            });
        });
        return newMap;
    }

    formatForApp(emptyMap, data) {
        return data.reduce((m, place) => {
            let key = place.x + "-" + place.y;
            m[key] = {
                key: key,
                level: place.level,
                name: place.name,
                descriptiveName: place.descriptiveName,
                description: place.description,
                w: place.blockedTo.indexOf("w") > -1,
                e: place.blockedTo.indexOf("e") > -1,
                n: place.blockedTo.indexOf("n") > -1,
                s: place.blockedTo.indexOf("s") > -1,
                onEnter: place.onEnter ? place.onEnter : m[key].onEnter,
                canEnter: place.canEnter ? place.canEnter : m[key].canEnter,
                onLeave: place.onLeave ? place.onLeave : m[key].onLeave,
            };
            return m;
        }, emptyMap);
    }

    formatForSave(newMapData) {
        let keys = Object.keys(newMapData);
        return {
            map: keys.reduce((acc, k) => {
                let [x,y] = k.split("-");
                let blocks = [newMapData[k].w ? "w" : null, newMapData[k].e ? "e" : null, newMapData[k].n ? "n" : null, newMapData[k].s ? "s" : null].filter(e => e);
                let tPlace = {
                    x,
                    y,
                    level: 0,
                    name: newMapData[k].name,
                    descriptiveName: newMapData[k].descriptiveName,
                    description: newMapData[k].description,
                    blockedTo: blocks,
                    onEnter: newMapData[k].onEnter,
                    canEnter: newMapData[k].canEnter,
                    onLeave: newMapData[k].onLeave,
                };
                return acc.concat(tPlace);
            }, [])
        };
    }

    kill() { }
}
