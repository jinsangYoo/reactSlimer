export function padLeadingZeros(num, size) {
    var s = num + '';
    while (s.length < size)
        s = '0' + s;
    return s;
}
export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getRandom6CharForSTVT() {
    return padLeadingZeros(getRandomIntInclusive(0, 999999), 6).toString();
}
//# sourceMappingURL=RandomUtil.js.map