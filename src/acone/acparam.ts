import ACProduct from './acproduct'

type ParamType = 'addcart' | 'buy' | 'delcart' | 'event'

export type IACParams = {
  init: (type: ParamType, value?: string) => ACParams
  TYPE: {
    ADDCART: ParamType
    BUY: ParamType
    DELCART: ParamType
    EVENT: ParamType
  }
}

export type ACParams = {
  type: ParamType
  name?: string

  //#region  BUY
  payMethodName?: string
  orderNumber?: string
  //#endregion

  products?: ACProduct[]
}

export const ACParams: IACParams = {
  TYPE: {
    ADDCART: 'addcart',
    BUY: 'buy',
    DELCART: 'delcart',
    EVENT: 'event',
  },
  init(type = ACParams.TYPE.EVENT, name?: string): ACParams {
    return {type, name}
  },
}
