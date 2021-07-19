export function mapValueObjectToObject(map) {
    return Array.from(map).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
}
export function mapValueStringToObject(map) {
    return Array.from(map).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
}
//# sourceMappingURL=MapUtil.js.map