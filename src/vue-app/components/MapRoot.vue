<template lang="html">
    <div v-on:keyup.up="handleKeyboardEvents">
        <nav class="Nav Nav__Main">
            <select v-model="cellSize">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
            Size
        </nav>
        <section class="Page">
            <section class="Map__ScrollWrapper">
                <canvas id="Map" class="Map" :style="canvasStyle"/>
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
//http://fabricjs.com/docs/fabric.Line.html
/* eslint-disable indent */
"use strict";
// import MapCell from "./MapCell";
import DescriptionsPanel from "./DescriptionsPanel";
import { fabric } from "fabric";

export default {
    name: "MapRoot",
    components: {
        // MapCell,
        DescriptionsPanel
    },
    mounted() {
        this.$store.dispatch("initMap");
        window.addEventListener("keydown", this.handleKeyboardEvents);
        this.setupCanvas();
    },
    data: () => ({
        canvas: null,
        cellDimension: 15,
        canvasStyle: {},
        localCellMap: {}
    }),
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
    watch:{
        rows(){
            this.drawMap();
        },
        cellSize(newVal){
            this.redrawCells();
        },
        selectedCell(){
            this.redrawCells();
        },
    },
    methods: {
        setupCanvas() {
            this.canvas = new fabric.Canvas("Map", {
                backgroundColor: "rgb(240,240,240)",
                selectionColor: "blue",
                selectionLineWidth: 1
            });
        },
        drawMap(){
            // this.canvas.clear();
            const cellsH = this.rows.length;
            const cellsW = this.rows[0].length;
            console.log( this.cellSize);
            this.localCellMap = {};
            this.canvas.setHeight(cellsH * this.cellSize);
            this.canvas.setWidth(cellsW * this.cellSize);
            this.rows.forEach((row, rowI) => {
                row.forEach((cell, cellI) => {
                    // console.log(cell);
                    const cellOptions = {
                        fill: "#ffffff",
                        hasControls: false,
                        height: this.cellSize,
                        width: this.cellSize,
                        left: this.cellSize * cellI,
                        top: this.cellSize * rowI,
                        lockMovementY: true,
                        lockMovementX: true,
                        lockRotation: true,
                        stroke: "f3f3f3"
                    };
                    const rect = new fabric.Rect(cellOptions);
                    const add = this.canvas.add(rect);
                    // console.log(add)
                    this.localCellMap[cell.key] = {
                        cellref: this.canvas.item((rowI + 1) * cellI),
                        x: cellI,
                        y: rowI
                    };
                });
            });
        },
        redrawCells(){
            Object.keys(this.localCellMap).forEach(cell => {
                const cellOptions = {
                    fill: "#ffffff",
                    hasControls: false,
                    height: this.cellSize,
                    width: this.cellSize,
                    left: this.cellSize * cell.x,
                    top: this.cellSize * cell.y,
                    lockMovementY: true,
                    lockMovementX: true,
                    lockRotation: true,
                    stroke: "f3f3f3"
                };
                this.localCellMap[cell].cellref.setOptions(cellOptions);
            });
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
}
.Map {
    border-collapse: collapse;
    // background: lightgrey;
}

.Map__ScrollWrapper {
    padding-bottom: 200px;
}
</style>
