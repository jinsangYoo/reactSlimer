export const ACParams = {
    TYPE: {
        ADDCART: 'addcart',
        APPEAR_PRODUCT: 'appearProduct',
        BUY: 'buy',
        DELCART: 'delcart',
        EVENT: 'event',
        JOIN: 'join',
        LEAVE: 'leave',
        LINK: 'link',
        LOGIN: 'login',
        TEL: 'tel',
    },
    init(type = ACParams.TYPE.EVENT, name) {
        return { type, name };
    },
};
//# sourceMappingURL=acparam.js.map