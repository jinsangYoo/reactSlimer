export var ACParams = {
    TYPE: {
        DEFAULT: 'none',
        EVENT: 'event',
        BUY: 'buy',
    },
    init: function (type, name) {
        if (type === void 0) { type = ACParams.TYPE.DEFAULT; }
        return { type: type, name: name };
    },
};
//# sourceMappingURL=acparam.js.map