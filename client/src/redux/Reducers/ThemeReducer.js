import { TOGGLE_THEME } from "../Actions/ThemeAction";

const initialState = {
    darkMode: true,
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                darkMode: !state.darkMode,
            };
        default:
            return state;
    }
};

export default themeReducer;
