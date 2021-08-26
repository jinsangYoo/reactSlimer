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
//# sourceMappingURL=TextUtils.js.map