<template lang="html">
    <section class="Map__DescriptionEditor padTop3 padBottom3 padLeft5 padRight5">
        <div class="DescRow flex">
            <p class="T__s1">
                {{ selectedCell.key || "No Cell Selected" }}
            </p>
            <div class="BlockingIndicator">
                <div class="BlockingIcon BlockingIcon__North" :class="{ isBlocked: selectedObject.n }" />
                <div class="BlockingIcon BlockingIcon__East" :class="{ isBlocked: selectedObject.e }" />
                <div class="BlockingIcon BlockingIcon__Inner" />
                <div class="BlockingIcon BlockingIcon__South" :class="{ isBlocked: selectedObject.s }" />
                <div class="BlockingIcon BlockingIcon__West" :class="{ isBlocked: selectedObject.w }" />
            </div>
        </div>
        <div class="DescRow">
            <div class="marginBottom2">
                <p>Name – {{canEditName}}</p>
                <input type="text" class="Input Input__text fullWidth" v-model="selectedObject.name" :disabled="!canEditName" :placeholder="!canEditName ? 'Multiple values' : 'Name'"/>
            </div>
            <div>
                <p>Descriptive Name – {{canEditDescName}}</p>
                <input type="text" class="Input Input__text fullWidth" v-model="selectedObject.descriptiveName" :disabled="!canEditDescName" :placeholder="!canEditDescName ? 'Multiple values' : 'Descriptive Name'"/>
            </div>
        </div>
        <div class="DescRow">
            <p>Description – {{canEditDesc}}</p>
            <textarea id="" cols="30" rows="6" class="Input Input__textarea fullWidth" v-model="selectedObject.description" :disabled="!canEditDesc" :placeholder="!canEditDesc ? 'Multiple values' : ''">
            </textarea>
        </div>
        <div class="DescRow">
            <select v-model="visibleMethod">
                <option value="onEnter">onEnter {{ !!selectedObject.onEnter ? "⚡️" : "" }}</option>
                <option value="canEnter">canEnter {{ !!selectedObject.canEnter ? "⚡️" : "" }}</option>
                <option value="onLeave">onLeave {{ !!selectedObject.onLeave ? "⚡️" : "" }}</option>
            </select>
            {{selectedObject[visibleMethod]}} {{visibleMethod}}
            <vue-js-editor :emitEvents="true" :code="selectedObject[visibleMethod]" :v-model="selectedObject[visibleMethod]" @change="updateCode" :readonly="!canEditCode[visibleMethod]" language="js"></vue-js-editor>
        </div>
        <div class="col_1 padLeft1">
            <button class="Button Button__Primary" @click="updateCell()">Update Cell{{ selectedCell.length > 1 && "s" }}</button>
        </div>
    </section>
</template>

<script>
/* eslint-disable indent */
"use strict";

import VueJsEditor from "@highlighted/vue-js-editor";

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export default {
    name: "DescriptionEditor",
    mounted() {},
    props: ["selectedCell"],
    components: {
        VueJsEditor
    },
    data: () => ({
        selectedObject: {},
        visibleMethod: "onEnter"
    }),
    computed: {
        selected() {
            return this.$store.state.selectedCell.key === this.cellData.key;
        },
        isTiny() {
            return this.$store.state.isTiny;
        },
        canEditDesc() {
            return this.selectedCell.map(cell => cell.description).filter(onlyUnique).length === 1;
        },
        canEditDescName() {
            return this.selectedCell.map(cell => cell.descriptiveName).filter(onlyUnique).length === 1;
        },
        canEditName() {
            return this.selectedCell.map(cell => cell.name).filter(onlyUnique).length === 1;
        },
        canEditCode() {
            return {
                onEnter: this.selectedCell.map(cell => cell.onEnter).filter(onlyUnique).length === 1,
                canEnter: this.selectedCell.map(cell => cell.canEnter).filter(onlyUnique).length === 1,
                onLeave: this.selectedCell.map(cell => cell.onLeave).filter(onlyUnique).length === 1
            };

        },
    },
    methods: {
        updateCell() {
            const keys = this.selectedCell.map(sc => sc.key);
            console.log({keys, data:this.selectedObject});
            this.$store.dispatch("saveCell", { keys, data: this.selectedObject });
        },
        updateCode(code){
            console.log(code);  
            this.selectedObject[this.visibleMethod] = code;
        }
    },
    watch: {
        selectedCell(newcell) {
            console.log(newcell)
            if (this.selectedCell.length === 1) {
                this.selectedObject = { ...newcell[0] };
            } else {
                const description = this.selectedCell.map(cell => cell.description).filter(onlyUnique);
                const descriptiveName = this.selectedCell.map(cell => cell.descriptiveName).filter(onlyUnique);
                const name = this.selectedCell.map(cell => cell.name).filter(onlyUnique);
                const onEnter = this.selectedCell.map(cell => cell.onEnter).filter(onlyUnique);
                const canEnter = this.selectedCell.map(cell => cell.canEnter).filter(onlyUnique);
                const onLeave = this.selectedCell.map(cell => cell.onLeave).filter(onlyUnique);
                this.selectedObject = {
                    description: description.length === 1 ? description[0] : false,
                    descriptiveName: descriptiveName.length === 1 ? descriptiveName[0] : false,
                    name: name.length === 1 ? name[0] : false,
                    onEnter: onEnter.length === 1 ? onEnter[0] : false,
                    canEnter: canEnter.length === 1 ? canEnter[0] : false,
                    onLeave: onLeave.length === 1 ? onLeave[0] : false
                };
            }
        }
    }
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
