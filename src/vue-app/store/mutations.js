export default {
    SET_CELL_DIMENSIONS(state, setting) {
        state.cellDimensions = setting;
    },
    SET_SELECTED_CELL(state, selectedCell) {
        state.selectedCell = [selectedCell];
    },
    ADD_SELECTED_CELL(state, selectedCell) {
        state.selectedCell = [...state.selectedCell, selectedCell];
    },
    SET_MAP_ROWS(state, mapRows) {
        state.mapRows = mapRows;
    },
    SET_MAP_CELL(state, {key, data}) {
        let [x, y] = key.split('-');
        let dummy = [...state.mapRows][x-1][y-1] = data;
        state.mapRows = dummy;
    }
};
