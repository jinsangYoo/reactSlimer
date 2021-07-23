import Task from '../../common/task/Task'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'
import {AxiosResponse} from 'axios'
import {makeSuccessCallback, makeFailCallback} from '../../common/util/MapUtil'
import {ACECallbackUnit} from '../../common/constant/ACECallbackUnit'
import {ACECallbackResultForDebug} from '../../common/constant/ACECallbackResultForDebug'

export default class APIForPL extends Task {
  public constructor(params: ITaskParams) {
    super(params)
  }

  public doWork() {
    super.doWork()
    console.log('APIForPL::doWork')
  }

  public didWork(callback: ((error?: object, result?: ACECallbackResultForDebug) => void) | undefined): void {
    super.didWork(callback)
    console.log('APIForPL::didWork')

    ACENetwork.requestToLog(
      response => {
        console.log('APIForPL::in cb::completed!!!')
        this.completed(response)
        this.doneWork()
        if (callback) {
          const callbackUnit: ACECallbackUnit = {
            title: 'normal send log.',
            location: 'APIForPL::ACENetwork.requestToLog::completed',
            result: true,
            payload: makeSuccessCallback(this),
          }
          callback(undefined, {
            prevResult: true,
            history: [callbackUnit],
          })
        }
      },
      err => {
        console.log('APIForPL::in cb::failed!!!')
        this.failed(err)
        this.doneWork()
        if (callback) {
          const callbackUnit: ACECallbackUnit = {
            title: 'fail send log.',
            location: 'APIForPL::ACENetwork.requestToLog::failed',
            result: false,
            payload: makeFailCallback(this),
          }
          callback(err, {
            prevResult: false,
            history: [callbackUnit],
          })
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
