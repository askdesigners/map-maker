<template lang="html">
    <div v-on:keyup.up="handleKeyboardEvents">
        <nav class="Nav Nav__Main flex">
            <div class="control">
                <select v-model="cellSize" name="borders">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
                <label for="borders">Size</label>
            </div>
            <div class="control">
                <input type="checkbox" name="borders" v-model="showBorders" />
                <label for="borders">Show borders</label>
            </div>
        </nav>
        <section class="Page">
            <section class="Map__ScrollWrapper">
                <!-- <canvas id="Map" class="Map" :style="canvasStyle" /> -->
                <v-stage :config="configKonva">
                    <v-layer>
                        <template v-for="(row, rowI) of rows">
                            <template v-for="(cell, colI) of row">
                                <v-rect :config="getRect(cell, rowI, colI)" :key="`cell-${colI}-${rowI}`" />
                                <!-- <v-circle :config="configCircle"></v-circle> -->
                            </template>
                        </template>
                    </v-layer>
                    <v-layer>
                        <template v-for="(row, rowI) of rows">
                            <template v-for="(cell, colI) of row">
                                <v-group :key="`walls-${colI}-${rowI}`" :config="getRectInner(cell, rowI, colI)">
                                    <v-line :config="getN(cell)" :key="`wall-n-${colI}-${rowI}`" />
                                    <v-line :config="getS(cell)" :key="`wall-s-${colI}-${rowI}`" />
                                    <v-line :config="getE(cell)" :key="`wall-e-${colI}-${rowI}`" />
                                    <v-line :config="getW(cell)" :key="`wall-w-${colI}-${rowI}`" />
                                    <v-circle :config="getDesc(cell)" :key="`desc-${colI}-${rowI}`" />
                                    <v-circle :config="getDescName(cell)" :key="`descname-${colI}-${rowI}`" />
                                    <v-circle :config="getName(cell)" :key="`name-${colI}-${rowI}`" />
                                    <v-text :config="{ text: cell.key, fontSize: 8, align: 'center', offsetY: -3, fill: '#797979', width: cellSize }" />
                                </v-group>
                                <!-- <v-circle :config="configCircle"></v-circle> -->
                            </template>
                        </template>
                    </v-layer>
                </v-stage>
                <!-- <table class="Map">
                    <tbody class="Map__Wrapper">
                        <tr class="Map__Row" v-for="(row, index) of rows" :key="`row-${index}`">
                            <td class="Map__Cell" v-for="(cell, index) of row" :key="`cell-${cell.name}-${index}`">
                                <MapCell :cellData="cell"></MapCell>
                            </td>
                        </tr>
                    </tbody>
                </table> -->
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
        // window.addEventListener("keydown", this.handleKeyboardEvents);
        // this.setupCanvas();
        this.rectConfig.height = this.cellSize;
        this.rectConfig.width = this.cellSize;
    },
    data: () => {
        return {
            showBorders: true,
            borderOffset: 1,
            configKonva: {
                width: 970,
                height: 600
            },
            rectConfig: {
                height: 25,
                width: 25
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
        }
    },
    watch: {
        rows() {
            // this.drawMap();
        },
        cellSize(newVal) {
            // this.redrawCells();
        },
        selectedCell() {
            // this.redrawCells();
        }
    },
    methods: {
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
                  x: ((this.cellSize / 6) * 2) - 2,
                  y: this.cellSize - (this.cellSize / 3),
                radius: 2,
                fill: "green"
            };
        },
        getDescName(cell) {
            if (!cell.descriptiveName) return { visible: false };
            return {
                  x: ((this.cellSize / 6) * 3) - 2,
                  y: this.cellSize - (this.cellSize / 3),
                radius: 2,
                fill: "orange"
            };
        },
        getName(cell) {
            if (!cell.name) return { visible: false };
            return {
                  x: ((this.cellSize / 6) * 4) - 2,
                  y: this.cellSize - (this.cellSize / 3),
                radius: 2,
                fill: "blue"
            };
        },
        setupCanvas() {
            // this.canvas = new fabric.Canvas("Map", {
            //     backgroundColor: "rgb(240,240,240)",
            //     selectionColor: "blue",
            //     selectionLineWidth: 1
            // });
            // this.canvas.on("mouse:wheel", opt => {
            //     const delta = opt.e.deltaY;
            //     let zoom = this.canvas.getZoom();
            //     zoom *= 0.999 ** delta;
            //     if (zoom > 20) zoom = this.borderOffset0;
            //     if (zoom < 0.01) zoom = 0.01;
            //     this.canvas.setZoom(zoom);
            //     opt.e.preventDefault();
            //     opt.e.stopPropagation();
            // });
            // this.canvas.on("mouse:down", function(opt) {
            //     const evt = opt.e;
            //     if (evt.altKey === true) {
            //         this.isDragging = true;
            //         this.selection = false;
            //         this.lastPosX = evt.clientX;
            //         this.lastPosY = evt.clientY;
            //     }
            // });
            // this.canvas.on("mouse:move", function(opt) {
            //     if (this.isDragging) {
            //         var e = opt.e;
            //         var vpt = this.viewportTransform;
            //         vpt[4] += e.clientX - this.lastPosX;
            //         vpt[5] += e.clientY - this.lastPosY;
            //         this.requestRenderAll();
            //         this.lastPosX = e.clientX;
            //         this.lastPosY = e.clientY;
            //     }
            // });
            // this.canvas.on("mouse:up", function(opt) {
            //     // on mouse up we want to recalculate new interaction
            //     // for all objects, so we call setViewportTransform
            //     this.setViewportTransform(this.viewportTransform);
            //     this.isDragging = false;
            //     this.selection = true;
            // });
        },
        // redrawCells() {
        //     Object.keys(this.localCellMap).forEach(cell => {
        //         const cellOptions = {
        //             fill: "#ffffff",
        //             hasControls: false,
        //             height: this.cellSize,
        //             width: this.cellSize,
        //             left: this.cellSize * cell.x,
        //             top: this.cellSize * cell.y,
        //             lockMovementY: true,
        //             lockMovementX: true,
        //             lockRotation: true,
        //             stroke: "#f3f3f3"
        //         };
        //         this.localCellMap[cell].cellref.setOptions(cellOptions);
        //     });
        // },
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
