import { SET_GLOBAL_VARIABLE } from './actions';

const rootReducer = (state = { globalVariable: null }, action) => {
    switch (action.type) {
        case SET_GLOBAL_VARIABLE:
            return {
                ...state,
                globalVariable: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
