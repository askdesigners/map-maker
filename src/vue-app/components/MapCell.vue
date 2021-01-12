<template lang="html">
    <span class="Map__CellInner" :class="{ tiny: isTiny, blockToN: cellData.n, blockToS: cellData.s, blockToE: cellData.e, blockToW: cellData.w, cellSelected: selected }" @click="select()">
        <div class="Indicator__Outer">
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
            return this.$store.state.selectedCell.key === this.cellData.key;
        },
        isTiny() {
            return this.$store.state.isTiny;
        },
    },
    methods: {
        select() {
            this.$store.dispatch("updateSelection", this.cellData);
        },
    },
    watch: {
        selected(newVal, oldVal) {
            if (newVal && !oldVal) {
                this.select();
            }
        },
    },
};
</script>

<style lang="scss">
@import "../scss/vars";

.Map__Cell {
    // padding: 0 1px 1px 0;
}

.Map__CellInner {
    display: block;
    width: 30px;
    height: 30px;
    font-size: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    border-radius: 4px;
    background: white;

    &:hover {
        background: $palegreen;
    }

    * {
        cursor: pointer;
    }

    &.cellSelected {
        background: $ltblue;
    }

    &.blockToN {
        border-top: 1px solid $dkblue;
    }
    &.blockToS {
        border-bottom: 1px solid $dkblue;
    }
    &.blockToE {
        border-right: 1px solid $dkblue;
    }
    &.blockToW {
        border-left: 1px solid $dkblue;
    }
}

.tiny {
    width: 18px;
    height: 18px;
    font-size: 0.4rem;
    line-height: 10px;

    .Key {
        display: none;
    }

    .Map__CellInner {
        width: 10px;
        height: 10px;
    }
}

.Indicator__Outer {
    height: 10px;
}

.Indicator {
    height: 4px;
    width: 4px;
    border-radius: 2px;
    display: inline-block;
}

.Indicator__Description {
    background: $green;
}

.Indicator__Name {
    background: $gold;
}

.Indicator__DescriptiveName {
    background: $warn;
}
</style>
