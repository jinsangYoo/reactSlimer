import AsyncStorage from '@react-native-async-storage/async-storage';
var ACECommonStaticConfig = (function () {
    function ACECommonStaticConfig() {
    }
    ACECommonStaticConfig.configure = function (value, callback) {
        console.log('ACECommonStaticConfig.configure: AceConfiguration: ' + JSON.stringify(value));
        return new Promise(function (resolve, reject) {
            var keyName = 'user_id';
            AsyncStorage.getItem(keyName, function (err, result) {
                console.log(result);
                if (callback) {
                    callback(err, {
                        getKey: keyName,
                        getValue: result,
                    });
                }
                else {
                    if (err) {
                        if (global.Promise) {
                            reject(err);
                        }
                        else {
                            console.error("Callback function isn't define");
                        }
                    }
                    else {
                        if (global.Promise) {
                            resolve({
                                getKey: keyName,
                                getValue: result,
                            });
                        }
                        else {
                            console.error("Callback function isn't define");
                        }
                    }
                }
            });
        });
    };
    return ACECommonStaticConfig;
}());
export { ACECommonStaticConfig };
//# sourceMappingURL=ACECommonStaticConfig.js.map