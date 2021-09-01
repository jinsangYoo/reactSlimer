import ACECONSTANT from '../constant/ACEConstant';
import { LogLevel } from '../constant/LogConstants';
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
    static isDevMode() {
        return LogLevel.INFO > this._logLevel;
    }
    static logLevelToIdentity(priority) {
        switch (priority) {
            case LogLevel.ASSERT:
                return 'A';
            case LogLevel.ERROR:
                return 'E';
            case LogLevel.WARN:
                return 'W';
            case LogLevel.INFO:
                return 'I';
            case LogLevel.DEBUG:
                return 'D';
            case LogLevel.VERBOSE:
                return 'V';
        }
    }
    static println(priority, tag, msg, info, moreDebugMessage) {
        if (!this.isLoggable(priority)) {
            return;
        }
        var _location;
        if (priority >= this._logLevel) {
            _location = ' [' + tag + ']';
        }
        else {
            _location = '::';
        }
        if (ACELog.isLoggable(priority)) {
            if (info) {
                console.log(`${ACECONSTANT.OFFICIAL_LOG_TAG} [SDK] [${new Date().toJSON()}] [${ACELog.logLevelToIdentity(priority)}]${_location}: ${msg}, debug: >>${moreDebugMessage !== null && moreDebugMessage !== void 0 ? moreDebugMessage : ACECONSTANT.EMPTY}<<, info: ${JSON.stringify(info, null, 2)}`);
            }
            else {
                console.log(`${ACECONSTANT.OFFICIAL_LOG_TAG} [SDK] [${new Date().toJSON()}] [${ACELog.logLevelToIdentity(priority)}]${_location}: ${msg}, debug: >>${moreDebugMessage !== null && moreDebugMessage !== void 0 ? moreDebugMessage : ACECONSTANT.EMPTY}<<`);
            }
        }
        else {
            if (info) {
                console.log(`${ACECONSTANT.OFFICIAL_LOG_TAG} [SDK] [${new Date().toJSON()}] [${ACELog.logLevelToIdentity(priority)}]${_location}: ${msg}, info: ${JSON.stringify(info, null, 2)}`);
            }
            else {
                console.log(`${ACECONSTANT.OFFICIAL_LOG_TAG} [SDK] [${new Date().toJSON()}] [${ACELog.logLevelToIdentity(priority)}]${_location}: ${msg}`);
            }
        }
    }
    static e(tag, msg, debug, moreDebugMessage) {
        ACELog.println(LogLevel.ERROR, tag, msg, debug, moreDebugMessage);
    }
    static d(tag, msg, debug, moreDebugMessage) {
        ACELog.println(LogLevel.DEBUG, tag, msg, debug, moreDebugMessage);
    }
    static i(tag, msg, info, moreDebugMessage) {
        ACELog.println(LogLevel.INFO, tag, msg, info, moreDebugMessage);
    }
    static v(tag, msg, info, moreDebugMessage) {
        ACELog.println(LogLevel.VERBOSE, tag, msg, info, moreDebugMessage);
    }
}
ACELog._logLevel = LogLevel.INFO;
//# sourceMappingURL=ACELog.js.map