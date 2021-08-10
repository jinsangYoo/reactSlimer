export var SDKMode;
(function (SDKMode) {
    SDKMode[SDKMode["development"] = 0] = "development";
    SDKMode[SDKMode["production"] = 1] = "production";
})(SDKMode || (SDKMode = {}));
export var NetworkMode;
(function (NetworkMode) {
    NetworkMode[NetworkMode["COMPANY_dev"] = 0] = "COMPANY_dev";
    NetworkMode[NetworkMode["HOME_dev"] = 1] = "HOME_dev";
    NetworkMode[NetworkMode["Pro"] = 2] = "Pro";
})(NetworkMode || (NetworkMode = {}));
export var NetworkRequestType;
(function (NetworkRequestType) {
    NetworkRequestType[NetworkRequestType["LOG"] = 0] = "LOG";
    NetworkRequestType[NetworkRequestType["POLICY"] = 1] = "POLICY";
})(NetworkRequestType || (NetworkRequestType = {}));
export var NetworkRequestType2;
(function (NetworkRequestType2) {
    NetworkRequestType2[NetworkRequestType2["COMPANY_LOCAL"] = 0] = "COMPANY_LOCAL";
    NetworkRequestType2[NetworkRequestType2["HOME_LOCAL_LOG"] = 1] = "HOME_LOCAL_LOG";
    NetworkRequestType2[NetworkRequestType2["HOME_LOCAL_POLICY"] = 2] = "HOME_LOCAL_POLICY";
    NetworkRequestType2[NetworkRequestType2["LOG"] = 3] = "LOG";
    NetworkRequestType2[NetworkRequestType2["POLICY"] = 4] = "POLICY";
})(NetworkRequestType2 || (NetworkRequestType2 = {}));
//# sourceMappingURL=SDKMode.js.map