import ACEofAPIForOne from '../../acone/constant/ACEofAPIForOne'

type IDebugParams = {}

type ITaskParams = {
  type: ACEofAPIForOne
  payload: object
  error: boolean
  debugParams: IDebugParams
}

export type {ITaskParams}
