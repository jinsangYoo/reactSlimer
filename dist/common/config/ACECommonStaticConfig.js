import AsyncStorage from '@react-native-async-storage/async-storage';
export class ACECommonStaticConfig {
    static configure(value, callback) {
        console.log('ACECommonStaticConfig.configure: AceConfiguration: ' + JSON.stringify(value));
        return new Promise((resolve, reject) => {
            const keyName = 'user_id';
            AsyncStorage.getItem(keyName, (err, result) => {
                console.log('AsyncStorage.getItem: ' + result);
                if (callback) {
                    console.log('try call cb!!');
                    callback(err, {
                        getKey: keyName,
                        getValue: result,
                    });
                }
                else {
                    if (err) {
                        if (global.Promise) {
                            console.log('try call reject!!');
                            reject(err);
                        }
                        else {
                            console.error("Callback function isn't define");
                        }
                    }
                    else {
                        if (global.Promise) {
                            console.log('try call resolve!!');
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
    }
}
//# sourceMappingURL=ACECommonStaticConfig.js.map