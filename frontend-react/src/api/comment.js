import { doPost, doDelete, doGet, doPut } from "../utils/request";
import {stringify} from "../utils/path";

const COMMENT = '/comment';

export const getComment = (bookId) => {
    return doGet(COMMENT + "/" + bookId);
};

export const listComment = (params) => {
    const str = stringify(params);
    return doGet(COMMENT + str);
};


export const addComment = (data) => {
    return doPost(COMMENT, data);
};


export const deleteComment = (id) => {
    return doDelete(COMMENT + "/" + id);
};

export const updateComment = (data) => {
    return doPut(COMMENT, data);
};
