export const ACParams = {
    TYPE: {
        ADDCART: 'addcart',
        APPEAR_PRODUCT: 'appearProduct',
        BUY: 'buy',
        DELCART: 'delcart',
        EVENT: 'event',
    },
    init(type = ACParams.TYPE.EVENT, name) {
        return { type, name };
    },
};
//# sourceMappingURL=acparam.js.map