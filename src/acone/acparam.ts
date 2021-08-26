import ACProduct from './acproduct'

type ParamType = 'addcart' | 'appearProduct' | 'buy' | 'delcart' | 'event'

export type IACParams = {
  init: (type: ParamType, value?: string) => ACParams
  TYPE: {
    ADDCART: ParamType
    APPEAR_PRODUCT: ParamType
    BUY: ParamType
    DELCART: ParamType
    EVENT: ParamType
  }
}

export type ACParams = {
  type: ParamType
  name?: string

  //#region  BUY
  orderNumber?: string
  payMethodName?: string
  productCategoryName?: string
  productName?: string
  productPrice?: string
  //#endregion

  products?: ACProduct[]
}

export const ACParams: IACParams = {
  TYPE: {
    ADDCART: 'addcart',
    APPEAR_PRODUCT: 'appearProduct',
    BUY: 'buy',
    DELCART: 'delcart',
    EVENT: 'event',
  },
  init(type = ACParams.TYPE.EVENT, name?: string): ACParams {
    return {type, name}
  },
}
