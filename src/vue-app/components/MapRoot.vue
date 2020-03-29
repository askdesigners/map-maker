<template lang="html">
    <div>
        <nav class="Nav Nav__Main">
            <input type="checkbox" class="Input Input__Checkbox " v-model="isTiny" />
            Tiny
        </nav>
        <section class="Page">
            <section class="Map__ScrollWrapper">
                <table class="Map">
                    <tbody class="Map__Wrapper">
                        <tr class="Map__Row" v-for="(row, index) of rows" :key="`row-${index}`">
                            <td class="Map__Cell" v-for="(cell, index) of row" :key="`cell-${cell.name}-${index}`">
                                <MapCell :cellData="cell"></MapCell>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section class="Map__DescriptionEditor padSides15 padTopBottom15">
                {{ selectedCell }}
                <h1 class="Text__bold marginBottom15 padBottom15">Cell: {{ selectedObject.key }}</h1>
                <div class="">
                    <p>Name</p>
                    <input type="text" class="Input Input__text" v-model="selectedObject.name" placeholder="Name" />
                </div>
                <div class="">
                    <p>Desc. Name</p>
                    <input type="text" class="Input Input__text" v-model="selectedObject.descriptiveName" placeholder="Descriptive name" />
                </div>
                <div class="">
                    <p>Description</p>
                    <textarea id="" cols="30" rows="10" class="Input Input__textarea" v-model="selectedObject.description">
                        Location Description
                    </textarea>
                </div>
                <div class="FormRow">
                    <a class="Button Button__Primary" @click="updateCell()">Update</a>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
/* eslint-disable indent */
"use strict";
import MapCell from "./MapCell";
export default {
    name: "MapRoot",
    components: {
        MapCell
    },
    mounted() {
        this.$store.dispatch("initMap");
    },
    data: () => ({
        selectedObject: {}
    }),
    computed: {
        rows() {
            return this.$store.state.mapRows;
        },
        isTiny: {
            get() {
                return this.$store.state.isTiny;
            },
            set(value) {
                this.$store.dispatch("setIsTiny", value);
            }
        },
        selectedCell() {
            return this.$store.state.selectedCell;
        }
    },
    methods: {
        updateCell() {
            this.$store.dispatch("saveCell", { cell: this.datalayer.selectedCell, data: this.selectedObject });
        },

        // setSelectedObjectData(key) { // to store
        //     this._ngZone.run(() => {
        //         this.selectedObject = Object.assign({}, this.datalayer.keyMap[key]);
        //     });
        // },

        moveSelection(x, y) {
            if (this.selectedCell == undefined) this.selectedCell = "1-1";
            let pos = this.selectedCell.split("-");
            pos[0] = parseInt(pos[0], 10) + x;
            pos[1] = parseInt(pos[1], 10) + y;
            this.$store.dispatch("updateSelection", pos.join("-"));
        },

        setBlockedDirection(dir) {
            this.$store.dispatch("updatedBlocked", this.selectedCell, dir);
        },

        handleKeyboardEvents(evt) {
            // how in vue?
            evt.preventDefault();
            evt.stopPropagation();
            if (evt.ctrlKey) {
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
                }
            }
            switch (evt.key) {
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
            return false;
        }
    }
};
</script>

<style lang="scss"></style>
