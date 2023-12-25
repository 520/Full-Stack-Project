import { doPost, doDelete, doGet, doPut } from "../utils/request";
import {stringify} from "../utils/path";

const SAVE = '/save';

export const getSave = (bookId) => {
    return doGet(SAVE + "/" + bookId);
};

export const listSave = (params) => {
    const str = stringify(params);
    return doGet(SAVE + str);
};


export const addSave = (data) => {
    return doPost(SAVE, data);
};


export const deleteSave = (id) => {
    return doDelete(SAVE + "/" + id);
};

export const updateSave = (data) => {
    return doPut(SAVE, data);
};
