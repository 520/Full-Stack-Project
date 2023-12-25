import { doPost, doDelete, doGet, doPut } from "../utils/request";
import {stringify} from "../utils/path";

const BOOK = '/book';

export const getBookByTitle = (title, params) => {
    const str = stringify(params);
    return doGet(BOOK + "/" + title + str);
};

export const getBookById = (bookId, params) => {
    const str = stringify(params);
    return doGet(BOOK + "/bookId/" + bookId + str);
};

export const listBook = (params) => {
    const str = stringify(params);
    return doGet(BOOK + str);
};


export const addBook = (data) => {
    return doPost(BOOK, data);
};


export const deleteBook = (id) => {
    return doDelete(BOOK + "/" + id);
};

export const updateBook = (data) => {
    return doPut(BOOK, data);
};
