import DataLayer from "../services/datalayer.service";
import store from "./index";

function mapReady(arrayMap) {
    store.dispatch("setMap", arrayMap);
}

function changedKey({ key, data }) {
    console.log(key, data);
    store.dispatch("updateSelection", data);
}

const dataLayer = new DataLayer(changedKey, mapReady);

const updateSelection = ({ commit }, key) => {
    console.log("------>", key);
    commit("SET_SELECTED_CELL", key);
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
const saveCell = ({ commit, state }, { key, data }) => {
    dataLayer.saveCell(key, data);
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
