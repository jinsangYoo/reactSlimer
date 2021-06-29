var ACEStaticConfig = (function () {
    function ACEStaticConfig() {
    }
    ACEStaticConfig.configure = function (value) {
        console.log('ACECommonStaticConfig.configure: AceConfiguration: ' + JSON.stringify(value));
    };
    return ACEStaticConfig;
}());
export { ACEStaticConfig };
//# sourceMappingURL=ACEStaticConfig.js.map