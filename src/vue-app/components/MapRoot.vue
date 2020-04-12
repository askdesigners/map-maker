<template lang="html">
    <div v-on:keyup.up="handleKeyboardEvents">
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
            <section class="Map__DescriptionEditor padTop3 padBottom3 padLeft5 padRight5">
                <div class="col__1">
                    <p class="T__s1">
                        {{ selectedCell.key }}
                    </p>
                </div>
                <div class="col__2 padLeft1 padRight1">
                    <div class="marginBottom2">
                        <p>Name</p>
                        <input type="text" class="Input Input__text fullWidth" v-model="selectedObject.name" placeholder="Name" />
                    </div>
                    <div class="">
                        <p>Desc. Name</p>
                        <input type="text" class="Input Input__text fullWidth" v-model="selectedObject.descriptiveName" placeholder="Descriptive name" />
                    </div>
                </div>
                <div class="col__2 padLeft1 padRight1">
                    <p>Description</p>
                    <textarea id="" cols="30" rows="6" class="Input Input__textarea fullWidth" v-model="selectedObject.description">
                        Location Description
                    </textarea>
                </div>
                <div class="col_1 padLeft1">
                    <button class="Button Button__Primary" @click="updateCell()">Update</button>
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
        window.addEventListener("keydown", this.handleKeyboardEvents);
    },
    data: () => ({
        selectedObject: {}
    }),
    watch:{
        selectedCell(newcell){
            this.selectedObject = {...newcell};
        }
    },
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
            this.$store.dispatch("saveCell", { key: this.selectedCell.key, data: this.selectedObject });
        },

        moveSelection(x, y) {
            if (this.selectedCell === undefined) this.selectedCell = {key: "1-1"};
            let pos = this.selectedCell.key.split("-");
            pos[0] = parseInt(pos[0], 10) + x;
            pos[1] = parseInt(pos[1], 10) + y;
            this.$store.dispatch("updateSelection", {key: pos.join("-")});
        },

        setBlockedDirection(dir) {
            this.$store.dispatch("updateBlocked", {key: this.selectedCell.key, dir});
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
.Nav__Main{
    padding: 5px;
    text-align: left;
}
.Map{
    border-collapse: collapse;
}

.Map__ScrollWrapper{
    padding-bottom: 200px;
}

.Map__DescriptionEditor{
    text-align: left;
    display: flex;
    width: 100vw;
    height: 150px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: lightgray;
}
</style>
