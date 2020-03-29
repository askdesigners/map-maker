import jsonfile from "jsonfile";
import path from "path";

export default class MapManager {
    constructor(ipcMain, jsonMapFile) {
        this.ipcBus = ipcMain;
        this.mapFile = jsonMapFile;
        ipcMain.on("getmap", this.getMap);
        ipcMain.on("updatemap", this.updateMap);
    }

    getMap(event, dimensions) {
        console.log("getting map");
        event.sender.send(
            "getmap-reply",
            this.formatForApp(
                this.buildEmptyMap(dimensions),
                jsonfile.readFileSync(path.join(__dirname, this.mapFile)).map
            )
        );
    }

    updateMap(event, newMapData) {
        let err = jsonfile.writeFileSync(
            path.join(__dirname, this.mapFile),
            this.formatForSave(newMapData)
        );
        console.error("Saved file", err);
    }

    buildEmptyMap(dimensions) {
        console.log("build empty map");
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
                    s: false
                };
            });
        });
        return newMap;
    }

    formatForApp(emptyMap, data) {
        console.log(
            "formatting map data",
            Object.keys(emptyMap).length,
            data.length
        );
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
                s: place.blockedTo.indexOf("s") > -1
            };
            console.log("returning", key, m[key].name, place.name);
            return m;
        }, emptyMap);
    }

    formatForSave(newMapData) {
        let keys = Object.keys(newMapData);
        return {
            map: keys.reduce((acc, k) => {
                let xy = k.split("-");
                let blocks = [
                    newMapData[k].w ? "w" : null,
                    newMapData[k].e ? "e" : null,
                    newMapData[k].n ? "n" : null,
                    newMapData[k].s ? "s" : null
                ].filter(e => e);
                let tPlace = {
                    x: xy[0],
                    y: xy[1],
                    level: 0,
                    name: newMapData[k].name,
                    descriptiveName: newMapData[k].descriptiveName,
                    description: newMapData[k].description,
                    blockedTo: blocks
                };
                return acc.concat(tPlace);
            }, [])
        };
    }

    kill() {
        console.log("It's dead now...");
    }
}
