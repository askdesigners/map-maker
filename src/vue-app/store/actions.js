import DataLayer from "../services/datalayer.service";
import store from "./index";

const mapReady = arrayMap => {
    store.dispatch("setMap", arrayMap);
};

const changedKey = ({ key, data }) => {
    console.log("changedKey", { key, data });
    store.dispatch("updateSelection", key);
};

const dataLayer = new DataLayer(changedKey, mapReady);

const updateSelection = ({ commit }, key) => {
    commit("SET_SELECTED_CELL", key);
};
const setMap = ({ commit }, rows) => {
    commit("SET_MAP_ROWS", rows);
};
const saveMap = ({ commit, state }) => {
    console.log(commit, state);
    dataLayer.saveMap();
};
const saveCell = ({ commit, state }, key, data) => {
    console.log(commit, state, key, data);
};

const initMap = () => {
    dataLayer.initMap();
};

const setIsTiny = ({ commit }, value) => {
    commit("SET_TINY", value);
};

export default {
    updateSelection,
    setMap,
    saveMap,
    saveCell,
    initMap,
    setIsTiny
};
