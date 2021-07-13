import Task from '../../common/task/Task'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'

export default class APIForPL extends Task {
  protected _logSource: number
  protected _name: string
  protected _date: Date

  public constructor(params: ITaskParams) {
    super(params)
  }

  public doWork() {
    super.doWork()
    console.log('APIForPL::doWork')
  }

  public didWork(callback: ((error?: object, result?: object) => void) | undefined): void
  public didWork(): Promise<object>
  public didWork(callback?: ((error?: object, result?: object) => void) | undefined): Promise<object> | void {
    super.didWork()
    console.log('APIForPL::didWork')

    if (!global.Promise) {
      console.log('APIForPL::not support promise.')

      ACENetwork.request(
        response => {
          console.log('APIForPL::in cb::completed!!!')
          this.completed(response)
          console.log('APIForPL::try doneWork 1')
          this.doneWork()
          if (callback) {
            console.log('try call cb!!')
            callback(undefined, response)
          }
        },
        err => {
          console.log('APIForPL::in cb::failed!!!')
          this.failed(err)
          console.log('APIForPL::try doneWork 2')
          this.doneWork()
          if (callback) {
            console.log('try call cb!!')
            callback(err, undefined)
          }
        },
      )
    } else {
      console.log('APIForPL::support promise.')

      return new Promise((resolve, reject) => {
        ACENetwork.request(
          response => {
            console.log('APIForPL::in cb::completed!!!')
            this.completed(response)
            this.doneWork()
            if (callback) {
              console.log('try call cb!!')
              callback(undefined, response)
            } else {
              console.log('try call resolve!!')
              resolve(response)
            }
          },
          err => {
            console.log('APIForPL::in cb::failed!!!')
            this.failed(err)
            this.doneWork()
            if (callback) {
              console.log('try call cb!!')
              callback(err, undefined)
            } else {
              console.log('try call reject!!')
              reject(err)
            }
          },
        )
      })
    }
  }

  public completed(response: object) {
    super.completed(response)
    console.log('APIForPL::completed')
  }

  public failed(err: object) {
    super.failed(err)
    console.log('APIForPL::failed')
  }

  public doneWork() {
    super.doneWork()
    console.log('APIForPL::doneWork')
  }
}
