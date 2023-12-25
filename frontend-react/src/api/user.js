import { doPost, doDelete, doGet, doPut } from "../utils/request";
import {stringify} from "../utils/path";

const USER = '/user';

export const getUser = (obj) => {
    return doPost(USER + "/token", obj);
};

export const listUser = (params) => {
    const str = stringify(params);
    return doGet(USER + str);
};


export const addUser = (data) => {
    return doPost(USER, data);
};


export const deleteUser = (id) => {
    return doDelete(USER + "/" + id);
};

export const updateUser = (data) => {
    return doPut(USER, data);
};
