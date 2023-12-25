import { doPost, doDelete, doGet, doPut } from "../utils/request";
import {stringify} from "../utils/path";

const MESSAGE = '/message';

export const getMessage = (bookId) => {
    return doGet(MESSAGE + "/" + bookId);
};

export const listMessage = () => {
    return doGet(MESSAGE);
};


export const addMessage = (data) => {
    return doPost(MESSAGE, data);
};


export const deleteMessage = (id) => {
    return doDelete(MESSAGE + "/" + id);
};

export const updateMessage = (data) => {
    return doPut(MESSAGE, data);
};
