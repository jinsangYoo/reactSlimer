type ParamType = 'none' | 'event' | 'buy'

export type IACParams = {
  init: (type: ParamType, value: string) => ACParams
  TYPE: {
    DEFAULT: ParamType
    EVENT: ParamType
    BUY: ParamType
  }
}

export type ACParams = {
  type: ParamType
  name: string
}

export const ACParams: IACParams = {
  TYPE: {
    DEFAULT: 'none',
    EVENT: 'event',
    BUY: 'buy',
  },
  init(type = ACParams.TYPE.DEFAULT, name: string): ACParams {
    return {type, name}
  },
}
