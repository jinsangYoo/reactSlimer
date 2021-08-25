export const ACParams = {
    TYPE: {
        ADDCART: 'addcart',
        BUY: 'buy',
        DELCART: 'delcart',
        EVENT: 'event',
    },
    init(type = ACParams.TYPE.EVENT, name) {
        return { type, name };
    },
};
//# sourceMappingURL=acparam.js.map