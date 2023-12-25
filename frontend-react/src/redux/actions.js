export const SET_GLOBAL_VARIABLE = 'SET_GLOBAL_VARIABLE';

export const setGlobalVariable = (value) => ({
    type: SET_GLOBAL_VARIABLE,
    payload: value,
});
