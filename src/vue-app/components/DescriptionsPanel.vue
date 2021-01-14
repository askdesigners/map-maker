<template lang="html">
    <section class="Map__DescriptionEditor padTop3 padBottom3 padLeft5 padRight5">
        <div class="DescRow flex">
            <p class="T__s1">
                {{ selectedCell.key || "No Cell Selected" }}
            </p>
            <div class="BlockingIndicator">
                <div class="BlockingIcon BlockingIcon__North" :class="{isBlocked: selectedObject.n}"/>
                <div class="BlockingIcon BlockingIcon__East" :class="{isBlocked: selectedObject.e}"/>
                <div class="BlockingIcon BlockingIcon__Inner"/>
                <div class="BlockingIcon BlockingIcon__South" :class="{isBlocked: selectedObject.s}"/>
                <div class="BlockingIcon BlockingIcon__West" :class="{isBlocked: selectedObject.w}"/>
            </div>
        </div>
        <div class="DescRow">
            <div class="marginBottom2">
                <p>Name</p>
                <input type="text" class="Input Input__text fullWidth" v-model="selectedObject.name" placeholder="Name" v-if="canEditName"/>
                <p class="T__s2 T__italic" v-if="!canEditName">
                    Multiple Values
                </p>
            </div>
            <div>
                <p>Desc. Name</p>
                <input type="text" class="Input Input__text fullWidth" v-model="selectedObject.descriptiveName" placeholder="Descriptive name" v-if="canEditDescName"/>
                <p class="T__s2 T__italic" v-if="!canEditDescName">
                    Multiple Values
                </p>
            </div>
        </div>
        <div class="DescRow">
            <p>Description</p>
            <textarea id="" cols="30" rows="6" class="Input Input__textarea fullWidth" v-model="selectedObject.description" v-if="canEditDesc">
                Location Description
            </textarea>
            <p class="T__s2 T__italic" v-if="!canEditDesc">
                Multiple Values
            </p>
        </div>
        <div class="col_1 padLeft1">
            <button class="Button Button__Primary" @click="updateCell()">Update Cell{{selectedCell.length > 1 && "s"}}</button>
        </div>
    </section>
</template>

<script>
/* eslint-disable indent */
"use strict";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default {
    name: "DescriptionEditor",
    mounted() {},
    props: ["selectedCell"],
    data: () => ({
        selectedObject: {},
    }),
    computed: {
        selected() {
            return this.$store.state.selectedCell.key === this.cellData.key;
        },
        isTiny() {
            return this.$store.state.isTiny;
        },
        canEditDesc(){
            return this.selectedCell.map((cell)=>cell.description).filter(onlyUnique).length === 1;
        },
        canEditDescName(){
            return this.selectedCell.map((cell)=>cell.descriptiveName).filter(onlyUnique).length === 1;
        },
        canEditName(){
            return this.selectedCell.map((cell)=>cell.name).filter(onlyUnique).length === 1;
        },
    },
    methods: {
        updateCell() {
            this.$store.dispatch("saveCell", { key: this.selectedCell.key, data: this.selectedObject });
        },
    },
    watch: {
        selectedCell(newcell) {
            if(this.selectedCell.length === 1){
                this.selectedObject = { ...newcell };
            } else {
                this.selectedObject = { };
            }
        },
    },
};
</script>

<style lang="scss">
@import "../scss/vars";
.Map__DescriptionEditor {
    text-align: left;
    width: 300px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    background: lightgray;
}

.DescRow {
    padding-bottom: 2rem;
}

.Button {
    padding: 1rem;
    background: aqua;
    font-size: 16px;
    border-radius: 10px;
}

.BlockingIndicator {
    position: relative;
    height: 30px;
    width: 30px;
    margin-left: auto;
}

.BlockingIcon {
    position: absolute;
    height: 15px;
    width: 15px;
    // border-radius: 3px;
    background: white;
    transition: background 0.2s;

    &__North {
        left: 5px;
        top: 0;
        height: 5px;
    }

    &__East {
        left: 20px;
        top: 5px;
        width: 5px;
    }

    &__Inner {
        left: 5px;
        top: 5px;
    }

    &__South {
        left: 5px;
        top: 20px;
        height: 5px;
    }

    &__West {
        left: 0;
        top: 5px;
        width: 5px;
    }

    &.isBlocked {
        background: darkblue;
    }
}
</style>
