export function isEmpty(value) {
    return (value === null ||
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && Object.keys(value).length === 0));
}
export function isAlphabetOrNumberAtStringStartIndex(value) {
    const regex = /^[\w].*/;
    return regex.test(value);
}
export function onlyAlphabetOrNumberAtStringStartIndex(value) {
    if (!isEmpty(value)) {
        while (!isAlphabetOrNumberAtStringStartIndex(value)) {
            value = value.substring(1);
            if (isEmpty(value)) {
                break;
            }
        }
    }
    return value;
}
export function isLetterAtStringStartIndex(value) {
    const regex = /^[\w|ㄱ-ㅎ|ㄱ-ㅎ|가-힣].*/;
    return regex.test(value);
}
export function onlyLetteringAtStartIndex(value) {
    if (!isEmpty(value)) {
        while (!isLetterAtStringStartIndex(value)) {
            value = value.substring(1);
            if (isEmpty(value)) {
                break;
            }
        }
    }
    return value;
}
export function stringToNumber(num, base) {
    const parsed = parseInt(num, base);
    if (isNaN(parsed)) {
        return 0;
    }
    return parsed;
}
export function encode(value) {
    return encodeURIComponent(value);
}
export function decode(value) {
    return decodeURIComponent(value);
}
export function getQueryVar(source) {
    var query = {};
    var pairs = (source[0] === '?' ? source.substring(1) : source).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}
export function getQueryForKey(source, value) {
    return getQueryVar(source)[value];
}
//# sourceMappingURL=TextUtils.js.map