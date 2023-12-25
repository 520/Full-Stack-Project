import { doPost, doDelete, doGet, doPut } from "../utils/request";
import {stringify} from "../utils/path";

const HISTORY = '/history'

export const getHistory = (userId, params) => {
    const str = stringify(params);
    console.log(str);
    return doGet(HISTORY + "/" + userId + str);
};

export const listHistory = () => {
    return doGet(HISTORY);
};


export const addHistory = (data) => {
    return doPost(HISTORY, data);
};


export const deleteHistory = (id) => {
    return doDelete(HISTORY + "/" + id);
};

export const updateHistory = (data) => {
    return doPut(HISTORY, data);
};
