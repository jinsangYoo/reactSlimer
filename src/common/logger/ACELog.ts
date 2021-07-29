import ACECONSTANT from '../constant/ACEConstant'
import {LogLevel} from '../constant/LogConstants'
import {isEmpty} from '../util/TextUtils'

export default class ACELog {
  private static _logLevel = LogLevel.INFO

  public static setProductionMode(): void {
    this.setLogLevel(LogLevel.INFO)
  }

  public static setAllLogLevel(): void {
    this.setLogLevel(LogLevel.VERBOSE)
  }

  public static setDevMode(): void {
    this.setLogLevel(LogLevel.DEBUG)
  }

  private static setLogLevel(logLevel: LogLevel): void {
    this._logLevel = logLevel
  }

  public static isLoggable(priority: LogLevel): boolean {
    return priority >= this._logLevel
  }

  private static println(priority: LogLevel, tag: string, msg: string, debugMessage?: string): void {
    if (!this.isLoggable(priority)) {
      return
    }

    if (priority >= LogLevel.INFO) {
      tag = ACECONSTANT.OFFICIAL_LOG_TAG
    }

    console.log(`[${tag}] [SDK] message: ${msg}`)
    if (!isEmpty(debugMessage)) {
      console.log(`[${tag}] [SDK] messageForDebug: ${debugMessage}`)
    }
  }

  public static d(tag: string, msg: string): void
  public static d(tag: string, msg: string, debugMessage: string): void
  public static d(tag: string, msg: string, debugMessage?: string): void {
    ACELog.println(LogLevel.DEBUG, tag, msg, debugMessage)
  }

  public static i(tag: string, msg: string): void
  public static i(tag: string, msg: string, debugMessage: string): void
  public static i(tag: string, msg: string, debugMessage?: string): void {
    ACELog.println(LogLevel.INFO, tag, msg, debugMessage)
  }
}
