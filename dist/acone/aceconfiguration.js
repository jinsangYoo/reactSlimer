export var AceConfiguration = {
    PLATFORM: {
        DEFAULT: 'ACONE',
    },
    init: function (key, platform, debug, enablePrivacyPolicy) {
        if (platform === void 0) { platform = AceConfiguration.PLATFORM.DEFAULT; }
        if (debug === void 0) { debug = true; }
        if (enablePrivacyPolicy === void 0) { enablePrivacyPolicy = false; }
        return { platform: platform, key: key, debug: debug, enablePrivacyPolicy: enablePrivacyPolicy };
    },
    toJSONString: function () {
        return JSON.stringify(this);
    },
};
//# sourceMappingURL=aceconfiguration.js.map