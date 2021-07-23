import {ACECallbackUnit} from './ACECallbackUnit'

export type ACECallbackResultForDebug = {
  prevResult: boolean
  history: [ACECallbackUnit]
}
