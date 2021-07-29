import ACECONSTANT from '../constant/ACEConstant';
import { LogLevel } from '../constant/LogConstants';
import { isEmpty } from '../util/TextUtils';
export default class ACELog {
    static setProductionMode() {
        this.setLogLevel(LogLevel.INFO);
    }
    static setAllLogLevel() {
        this.setLogLevel(LogLevel.VERBOSE);
    }
    static setDevMode() {
        this.setLogLevel(LogLevel.DEBUG);
    }
    static setLogLevel(logLevel) {
        this._logLevel = logLevel;
    }
    static isLoggable(priority) {
        return priority >= this._logLevel;
    }
    static println(priority, tag, msg, debugMessage) {
        if (!this.isLoggable(priority)) {
            return;
        }
        if (priority >= LogLevel.INFO) {
            tag = ACECONSTANT.OFFICIAL_LOG_TAG;
        }
        console.log(`[${tag}] [SDK] message: ${msg}`);
        if (!isEmpty(debugMessage)) {
            console.log(`[${tag}] [SDK] messageForDebug: ${debugMessage}`);
        }
    }
    static d(tag, msg, debugMessage) {
        ACELog.println(LogLevel.DEBUG, tag, msg, debugMessage);
    }
    static i(tag, msg, debugMessage) {
        ACELog.println(LogLevel.INFO, tag, msg, debugMessage);
    }
}
ACELog._logLevel = LogLevel.INFO;
//# sourceMappingURL=ACELog.js.map