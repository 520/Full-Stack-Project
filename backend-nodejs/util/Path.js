import qs from 'qs';
export function parse(pathStr) {
    return qs.parse(pathStr,{ignoreQueryPrefix: true});
}

export function stringify(object) {
    return qs.stringify(object, {addQueryPrefix: true});
}
