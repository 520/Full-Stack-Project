import Cookies from 'js-cookie';

const ID = 'ID';
const REALNAME = 'REALNAME';
const TOKEN = 'TOKEN';
const ROLE = 'ROLE';

export function setCookie(key, value, days) {
    Cookies.set(key, value, { expires: days });
}
export function getCookie(key) {
    return Cookies.get(key);
}
export function removeCookie(key) {
    Cookies.remove(key);
}

export function getToken() {
    return getCookie(TOKEN);
}

export function removeToken() {
    removeCookie(TOKEN);
}

export function setToken(token) {
    setCookie(TOKEN, token, 30);
}

export function setId(id) {
    setCookie(ID, id,30);
}

export function getId() {
    return getCookie(ID);
}

export function setRealName(realName) {
    setCookie(REALNAME, realName,30);
}

export function getRealName() {
    return getCookie(REALNAME);
}

export function setRole(role) {
    setCookie(ROLE, role,30);
}

export function getRole() {
    return getCookie(ROLE);
}


