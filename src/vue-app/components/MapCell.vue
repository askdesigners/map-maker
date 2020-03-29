<template lang="html">
    <span class="Map__CellInner" :class="{ tiny: isTiny, blockToN: cellData.n, blockToS: cellData.s, blockToE: cellData.e, blockToW: cellData.w, cellSelected: selected }" @click="select()">
        <div>
            <span class="Indicator Indicator__Name" v-if="cellData.name != ''"></span>
            <span class="Indicator Indicator__DescriptiveName" v-if="cellData.descriptiveName != ''"></span>
            <span class="Indicator Indicator__Description" v-if="cellData.description != ''"></span>
        </div>
        <span class="Key">{{ cellData.key }}</span>
    </span>
</template>

<script>
/* eslint-disable indent */
"use strict";

export default {
    name: "MapCell",
    mounted() {},
    props: ["cellData"],
    data: () => ({}),
    computed: {
        selected() {
            // test if is the same cell
            return this.$store.state.selectedCell;
        },
        isTiny() {
            return this.$store.state.isTiny;
        }
    },
    methods: {
        select() {
            console.log(this.cellData);
            this.$store.dispatch("updateSelection", this.cellData.key);
        }
    }
};
</script>

<style lang="scss">
@import "../scss/vars";

.Map__CellInner {
    display: block;
    width: 20px;
    height: 20px;
    font-size: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;

    .Map__CellInner {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

.tiny {
    width: 10px;
    height: 10px;
    font-size: 0.2rem;
    line-height: 10px;

    .Key {
        display: none;
    }

    .Map__CellInner {
        width: 10px;
        height: 10px;
    }
}

.Indicator {
    height: 4px;
    width: 4px;
    border-radius: 2px;
    display: inline-block;
}

.Indicator__Description {
    background: $ltblue;
}

.Indicator__Name {
    background: $gold;
}

.Indicator__DescriptiveName {
    background: $warn;
}
</style>
