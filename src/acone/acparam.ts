type ParamType = 'none' | 'event' | 'buy'

export type IACParams = {
  init: (type: ParamType, value: string) => ACParams
  TYPE: {
    EVENT: ParamType
    BUY: ParamType
  }
}

export type ACParams = {
  type: ParamType
  name: string

  //#region  BUY
  payMethodName?: string
  orderNumber?: string
  //#endregion
}

export const ACParams: IACParams = {
  TYPE: {
    EVENT: 'event',
    BUY: 'buy',
  },
  init(type = ACParams.TYPE.EVENT, name: string): ACParams {
    return {type, name}
  },
}
