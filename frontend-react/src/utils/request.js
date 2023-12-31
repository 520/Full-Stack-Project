import {getToken, removeToken} from "./cookie";


let mytoken = getToken();
let backUrl = "http://localhost:3000/login";
let errorMsg = "Cookie has expired, Log in again please.";
let prodCommon = "http://localhost:8000";

export function doPost(url, data) {
    return new Promise(function(resolve, reject) {
        console.log(mytoken);
        fetch(prodCommon + url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": mytoken,
            },
            body: JSON.stringify(data),
        })
            .then(function(response) {
                if (response.status === 401) {
                    window.setTimeout(() => {
                        removeToken();
                        window.location.href = backUrl;
                    },  2000000000);
                    reject(response);
                }
                return response.json();
            })
            .then(function(json) {
                resolve(json);
            })
            .catch(function(err) {
                console.log(err);
            });
    });
}

export function doGet(url) {
    return new Promise(function(resolve, reject) {
        fetch(prodCommon + url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": mytoken,
            },
        })
            .then(function(response) {
                if (response.status === 401) {
                    window.setTimeout(() => {
                        removeToken();
                        window.location.href = backUrl;
                    },  2000000);
                    reject(response);
                }
                return response.json();
            })
            .then(function(json) {
                resolve(json);
            })
            .catch(function(err) {
                reject(err);
            });
    });
}

export function doPut(url, data) {
    return new Promise(function(resolve, reject) {
        fetch(prodCommon + url, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Authorization": mytoken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(function(response) {
                if (response.status === 401) {
                    window.setTimeout(() => {
                        removeToken();
                        window.location.href = backUrl;
                    },  2000000);
                    reject(response);
                }
                return response.json();
            })
            .then(function(json) {
                resolve(json);
            })
            .catch(function(err) {
                reject(err);
            });
    });
}

export function doDelete(url) {
    return new Promise(function(resolve, reject) {
        fetch(prodCommon + url, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Authorization": mytoken,
            },
        })
            .then(function(response) {
                if (response.status === 401) {
                    window.setTimeout(() => {
                        removeToken();
                        window.location.href = backUrl;
                    },  2000000);
                    reject(response);
                }
                return response.json();
            })
            .then(function(json) {
                resolve(json);
            })
            .catch(function(err) {
                reject(err);
            });
    });
}

