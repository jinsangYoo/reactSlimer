import {ITaskParams} from './ITaskParams'
import ACEofAPIForOne from '../../acone/constant/ACEofAPIForOne'
import {AxiosResponse} from 'axios'
import ACENetworkResult from '../http/ACENetworkResult'
import {ACEResponseToCaller} from '../constant/ACEPublicStaticConfig'
import ACELog from '../logger/ACELog'

export default class Task {
  private static _pTAG = 'pTask'
  protected _logSource: ACEofAPIForOne
  protected _date: number
  protected _response: ACENetworkResult
  protected _error: JSON

  protected constructor(params: ITaskParams) {
    this._logSource = params.type
    this._date = Date.now()
  }

  public doWork() {
    ACELog.d(Task._pTAG, `doWork: ${ACEofAPIForOne[this._logSource]}`)
  }

  public didWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void {
    ACELog.d(Task._pTAG, `didWork: ${ACEofAPIForOne[this._logSource]}`)
  }

  public doneWork() {
    ACELog.d(Task._pTAG, `doneWork: ${ACEofAPIForOne[this._logSource]}`)
  }

  protected completed(response: AxiosResponse) {
    ACELog.d(Task._pTAG, `completed: ${ACEofAPIForOne[this._logSource]}`)
    this._response = new ACENetworkResult(response)
  }

  protected failed(err: any) {
    ACELog.d(Task._pTAG, `failed: ${ACEofAPIForOne[this._logSource]}`, err)
    this._error = JSON.parse(JSON.stringify(err))
  }

  public getLogSource(): number {
    return this._logSource
  }

  public getDescription(): string {
    return ACEofAPIForOne[this._logSource]
  }

  public getCreateTime(): number {
    return this._date
  }

  public getTaskHash(): string {
    return this.getCreateTime().valueOf().toString()
  }

  public getNetworkResult(): ACENetworkResult | undefined {
    return this._response
  }

  public getNetworkError(): JSON | undefined {
    return this._error
  }
}
