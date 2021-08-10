export const AceConfiguration = {
    PLATFORM: {
        DEFAULT: 'ACONE',
    },
    init(key, platform = AceConfiguration.PLATFORM.DEFAULT, debug = true, enablePrivacyPolicy = false) {
        return { platform, key, debug, enablePrivacyPolicy };
    },
    toJSONString() {
        return JSON.stringify(this);
    },
};
//# sourceMappingURL=aceconfiguration.js.map