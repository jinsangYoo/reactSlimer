export const ACParams = {
    TYPE: {
        DEFAULT: 'none',
        EVENT: 'event',
        BUY: 'buy',
    },
    init(type = ACParams.TYPE.DEFAULT, name) {
        console.log(`in ACParams.init, type: ${type}, name: ${name}`);
        return { type, name };
    },
};
//# sourceMappingURL=acparam.js.map