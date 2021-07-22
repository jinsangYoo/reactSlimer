import {ITaskParams} from './ITaskParams'
import ACEofAPIForOne from '../../acone/constant/ACEofAPIForOne'
import {AxiosResponse} from 'axios'
import ACENetworkResult from '../http/ACENetworkResult'

export default class Task {
  protected _logSource: ACEofAPIForOne
  protected _date: Date
  protected _response: ACENetworkResult
  protected _error: JSON

  protected constructor(params: ITaskParams) {
    this._logSource = params.type
    this._date = new Date()
  }

  public doWork() {
    console.log('ITask::doWork')
  }

  public didWork(callback: ((error?: object, result?: object) => void) | undefined): void
  public didWork(): Promise<object>
  public didWork(callback?: ((error?: object, result?: object) => void) | undefined): Promise<object> | void {
    console.log('ITask::didWork')
  }

  public doneWork() {
    console.log('ITask::doneWork')
  }

  protected completed(response: AxiosResponse) {
    this._response = new ACENetworkResult(response)
  }

  protected failed(err: any) {
    this._error = JSON.parse(JSON.stringify(err))
  }

  public getLogSource(): number {
    return this._logSource
  }

  public getDescription(): string {
    return ACEofAPIForOne[this._logSource]
  }

  public getCreateTime(): Date {
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
