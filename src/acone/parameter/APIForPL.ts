import Task from '../../common/task/Task'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'
import {AxiosResponse} from 'axios'
import {makeSuccessCallbackParams, makeFailCallbackParams} from '../../common/util/MapUtil'
import {ACEResponseToCaller} from '../../common/constant/ACEPublicStaticConfig'

export default class APIForPL extends Task {
  public constructor(params: ITaskParams) {
    super(params)
  }

  public doWork() {
    super.doWork()
    console.log('APIForPL::doWork')
  }

  public didWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void {
    super.didWork(callback)
    console.log('APIForPL::didWork')

    ACENetwork.requestToLog(
      response => {
        console.log('APIForPL::in requestToLog.completed')
        this.completed(response)
        this.doneWork()
        if (callback) {
          callback(undefined, makeSuccessCallbackParams(this))
        }
      },
      err => {
        console.log('APIForPL::in requestToLog.failed')
        this.failed(err)
        this.doneWork()
        if (callback) {
          callback(err, makeFailCallbackParams(this))
        }
      },
    )
  }

  public completed(response: AxiosResponse) {
    super.completed(response)
    console.log('APIForPL::completed')
  }

  public failed(err: any) {
    super.failed(err)
    console.log('APIForPL::failed')
  }

  public doneWork() {
    super.doneWork()
    console.log('APIForPL::doneWork')
  }
}
