<template lang="html">
    <div v-on:keyup.up="handleKeyboardEvents">
        <nav class="Nav Nav__Main flex">
            <div class="control">
                <input type="checkbox" id="mapImage" v-model="showMap" />
                <label for="mapImage">Show map</label>
            </div>
            <div class="control">
                <input type="checkbox" id="borders" v-model="showBorders" />
                <label for="borders">Show borders</label>
            </div>
            <div class="control">
                <input type="checkbox" id="labels" v-model="showLabels" />
                <label for="labels">Show labels</label>
            </div>
        </nav>
        <section class="Page">
            <section class="Map__ScrollWrapper">
                <v-stage :config="configKonva">
                    <v-layer :config="{visible: showMap}">
                        <v-image :config="mapImage" />
                    </v-layer>
                    <v-layer :config="{visible: showBorders}">
                        <template v-for="(row, rowI) of rows">
                            <v-line :config="{ stroke: '#f3f3f3', strokeWidth: 1, opacity: 0.2, points: [0, cellSize * rowI, configKonva.width, cellSize * rowI] }" :key="`grid-x-${rowI}`" />
                            <template v-for="(cell, colI) of row">
                                <v-line :config="{ stroke: '#f3f3f3', strokeWidth: 1, opacity: 0.02, points: [cellSize * colI, 0, cellSize * colI, configKonva.height] }" :key="`grid-y-${rowI}-${colI}`" />
                            </template>
                        </template>
                    </v-layer>
                    <v-layer>
                        <template v-for="(row, rowI) of rows">
                            <template v-for="(cell, colI) of row">
                                <v-group :key="`walls-${colI}-${rowI}`" :config="getRectInner(cell, rowI, colI)" @click="selectCell($event, cell)">
                                    <v-rect :config="{ width: cellSize, height: cellSize, fill: '#03fcf4', opacity: selectedCellKeys.includes(cell.key) ? 0.8 : 0 }" :key="`bg-${colI}-${rowI}`" />
                                    <v-line :config="getN(cell)" :key="`wall-n-${colI}-${rowI}`" />
                                    <v-line :config="getS(cell)" :key="`wall-s-${colI}-${rowI}`" />
                                    <v-line :config="getE(cell)" :key="`wall-e-${colI}-${rowI}`" />
                                    <v-line :config="getW(cell)" :key="`wall-w-${colI}-${rowI}`" />
                                    <v-group :config="{visible: showLabels}" :key="`labels-${colI}-${rowI}`">
                                        <v-circle :config="getDesc(cell)" :key="`desc-${colI}-${rowI}`" />
                                        <v-circle :config="getDescName(cell)" :key="`descname-${colI}-${rowI}`" />
                                        <v-circle :config="getName(cell)" :key="`name-${colI}-${rowI}`" />
                                        <v-text :config="{ text: cell.key, fontSize: 8, align: 'center', offsetY: -3, fill: '#797979', width: cellSize }" />
                                    </v-group>
                                </v-group>
                            </template>
                        </template>
                    </v-layer>
                </v-stage>
            </section>
            <DescriptionsPanel :selectedCell="selectedCell" />
        </section>
    </div>
</template>

<script>
/* eslint-disable indent */
"use strict";
// import MapCell from "./MapCell";
import DescriptionsPanel from "./DescriptionsPanel";

export default {
    name: "MapRoot",
    components: {
        // MapCell,
        DescriptionsPanel
    },
    mounted() {
        this.$store.dispatch("initMap");
        const image = new Image();
        image.src = "https://i.imgur.com/MJTskdL.jpg";
        image.onload = () => {
            // set image only when it is loaded
            this.mapImage = {
                image,
                width: image.naturalWidth,
                height: image.naturalHeight,
            };
        };
    },
    data: () => {
        return {
            showMap: true,
            showBorders: true,
            showLabels: true,
            borderOffset: 1,
            mapImage: null,
            configKonva: {
                width: 1200,
                height: 800,
                draggable: true,
                fill: "grey"
            },
            rectConfig: {
                height: 30,
                width: 30
            }
        };
    },
    computed: {
        rows() {
            return this.$store.state.mapRows;
        },
        cellSize: {
            get() {
                return this.$store.state.cellDimensions;
            },
            set(value) {
                this.$store.dispatch("setCellDimensions", value);
            }
        },
        selectedCell() {
            return this.$store.state.selectedCell;
        },
        selectedCellKeys() {
            return this.$store.state.selectedCell.map(c=>c.key);
        }
    },
    methods: {
        selectCell({evt}, cell) {
            console.log(evt);
            this.$store.dispatch("updateSelection", {cell, op: evt.altKey ? "add" : "replace"});
        },
        getRect(cell, row, col) {
            if (!this.showBorders)
                return {
                    visible: false
                };
            return { ...this.rectConfig, x: this.cellSize * col, y: this.cellSize * row, stroke: "#f3f3f3", fill: "transparent" };
        },
        getRectInner(cell, row, col) {
            return { ...this.rectConfig, name: cell.key, listening: true, x: this.cellSize * col, y: this.cellSize * row };
        },
        getN(cell) {
            if (cell.n === false) return { visible: false };
            let x1 = this.borderOffset;
            let y1 = this.borderOffset;
            let x2 = this.cellSize - this.borderOffset;
            let y2 = this.borderOffset;
            return {
                points: [x1, y1, x2, y2],
                strokeWidth: 1,
                stroke: "#121938",
                lineCap: "round",
                name: "north"
            };
        },
        getS(cell) {
            if (cell.s === false) return { visible: false };
            let x1 = this.borderOffset;
            let y1 = this.cellSize - this.borderOffset;
            let x2 = this.cellSize - this.borderOffset;
            let y2 = this.cellSize - this.borderOffset;
            return {
                points: [x1, y1, x2, y2],
                strokeWidth: 1,
                stroke: "#121938",
                lineCap: "round",
                name: "south"
            };
        },
        getW(cell) {
            if (cell.w === false) return { visible: false };
            let x1 = this.borderOffset;
            let y1 = this.borderOffset;
            let x2 = this.borderOffset;
            let y2 = this.cellSize - this.borderOffset;
            return {
                points: [x1, y1, x2, y2],
                strokeWidth: 1,
                stroke: "#121938",
                lineCap: "round",
                name: "west"
            };
        },
        getE(cell) {
            if (cell.e === false) return { visible: false };
            let x1 = this.cellSize - this.borderOffset;
            let y1 = this.borderOffset;
            let x2 = this.cellSize - this.borderOffset;
            let y2 = this.cellSize - this.borderOffset;
            return {
                points: [x1, y1, x2, y2],
                strokeWidth: 1,
                stroke: "#121938",
                lineCap: "round",
                name: "east"
            };
        },
        getDesc(cell) {
            if (!cell.description) return { visible: false };
            return {
                x: (this.cellSize / 6) * 2 - 2,
                y: this.cellSize - this.cellSize / 3,
                radius: 2,
                fill: "green"
            };
        },
        getDescName(cell) {
            if (!cell.descriptiveName) return { visible: false };
            return {
                x: (this.cellSize / 6) * 3 - 2,
                y: this.cellSize - this.cellSize / 3,
                radius: 2,
                fill: "orange"
            };
        },
        getName(cell) {
            if (!cell.name) return { visible: false };
            return {
                x: (this.cellSize / 6) * 4 - 2,
                y: this.cellSize - this.cellSize / 3,
                radius: 2,
                fill: "blue"
            };
        },
        moveSelection(x, y) {
            if (this.selectedCell === undefined) this.selectedCell = { key: "1-1" };
            let pos = this.selectedCell.key.split("-");
            pos[0] = parseInt(pos[0], 10) + x;
            pos[1] = parseInt(pos[1], 10) + y;
            this.$store.dispatch("updateSelection", { key: pos.join("-") });
        },

        setBlockedDirection(dir) {
            this.$store.dispatch("updateBlocked", { key: this.selectedCell.key, dir });
        },

        handleKeyboardEvents(evt) {
            if (evt.ctrlKey) {
                evt.preventDefault();
                evt.stopPropagation();
                switch (evt.key) {
                    case "a":
                        this.setBlockedDirection("w");
                        break;
                    case "w":
                        this.setBlockedDirection("n");
                        break;
                    case "d":
                        this.setBlockedDirection("e");
                        break;
                    case "s":
                        this.setBlockedDirection("s");
                        break;
                    case "ArrowLeft":
                        this.moveSelection(-1, 0);
                        break;
                    case "ArrowUp":
                        this.moveSelection(0, -1);
                        break;
                    case "ArrowRight":
                        this.moveSelection(1, 0);
                        break;
                    case "ArrowDown":
                        this.moveSelection(0, 1);
                        break;
                }
            }
            return false;
        }
    }
};
</script>

<style lang="scss">
.Page {
    padding-right: 300px;
}

.Nav__Main {
    padding: 5px;
    text-align: left;
    background: whitesmoke;
}

.control {
    padding-right: 20px;
}

.Map {
    border-collapse: collapse;
    // background: lightgrey;
}

.Map__ScrollWrapper {
    padding-bottom: 200px;
}
</style>
