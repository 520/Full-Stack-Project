import { doPost, doDelete, doGet, doPut } from "../utils/request";
import {stringify} from "../utils/path";

const BORROWING = '/borrowing';

export const getBorrowing = (bookId) => {
    return doGet(BORROWING + "/" + bookId);
};

export const listBorrowing = (params) => {
    const str = stringify(params);
    return doGet(BORROWING + str);
};


export const addBorrowing = (data) => {
    return doPost(BORROWING, data);
};


export const deleteBorrowing = (id) => {
    return doDelete(BORROWING + "/" + id);
};

export const updateBorrowing = (data) => {
    return doPut(BORROWING, data);
};

export const returnBorrowing = (id) => {
    return doPut(BORROWING + "/" + id);
};
