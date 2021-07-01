import APIForTypes from '../../acone/constant/APIForTypes'

type ITaskParams = {
  type: APIForTypes
  payload: object
  error: boolean
  debugParams: object
}

export type {ITaskParams}
