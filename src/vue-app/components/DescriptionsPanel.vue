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
                <input type="text" class="Input Input__text fullWidth" v-model="selectedObject.name" placeholder="Name" />
            </div>
            <div>
                <p>Desc. Name</p>
                <input type="text" class="Input Input__text fullWidth" v-model="selectedObject.descriptiveName" placeholder="Descriptive name" />
            </div>
        </div>
        <div class="DescRow">
            <p>Description</p>
            <textarea id="" cols="30" rows="6" class="Input Input__textarea fullWidth" v-model="selectedObject.description">
                Location Description
            </textarea>
        </div>
        <div class="col_1 padLeft1">
            <button class="Button Button__Primary" @click="updateCell()">Update Cell</button>
        </div>
    </section>
</template>

<script>
/* eslint-disable indent */
"use strict";

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
    },
    methods: {
        updateCell() {
            this.$store.dispatch("saveCell", { key: this.selectedCell.key, data: this.selectedObject });
        },
    },
    watch: {
        selectedCell(newcell) {
            console.log(newcell);
            this.selectedObject = { ...newcell };
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
