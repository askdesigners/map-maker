import DataLayer from "../services/datalayer.service";
import store from "./index";

function mapReady(arrayMap) {
    store.dispatch("setMap", arrayMap);
}

function changedKey({ key, data }) {
    store.dispatch("updateSelection", data);
}

const dataLayer = new DataLayer(changedKey, mapReady);

const updateSelection = ({ commit }, {cell, op}) => {
    switch (op) {
        case "replace":
            commit("SET_SELECTED_CELL", cell);
            break;
        case "add":
            commit("ADD_SELECTED_CELL", cell);
            break;
        default:
            break;
    }
};
const updateBlocked = ({ commit }, { key, dir }) => {
    dataLayer.updateBlocked({ key, dir });
};
const setMap = ({ commit }, rows) => {
    commit("SET_MAP_ROWS", rows);
};
const saveMap = ({ commit, state }) => {
    dataLayer.saveMap();
};
const saveCell = ({ commit, state }, { keys, data }) => {
    dataLayer.saveCell({keys, data});
};

const initMap = () => {
    dataLayer.initMap();
};

const setCellDimensions = ({ commit }, value) => {
    commit("SET_CELL_DIMENSIONS", value);
};

export default {
    updateSelection,
    updateBlocked,
    setMap,
    saveMap,
    saveCell,
    initMap,
    setCellDimensions
};
