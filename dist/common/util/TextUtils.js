export function isEmpty(value) {
    return (value === null ||
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && Object.keys(value).length === 0));
}
export function isLetterAtStringStartIndex(value) {
    const regex = /^[\w].*/;
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
//# sourceMappingURL=TextUtils.js.map