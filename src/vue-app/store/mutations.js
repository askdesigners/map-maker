export default {
    SET_TINY(state, setting) {
        state.isTiny = setting;
    },
    SET_SELECTED_CELL(state, selectedCell) {
        state.selectedCell = selectedCell;
    },
    SET_MAP_ROWS(state, mapRows) {
        state.mapRows = mapRows;
    }
};
