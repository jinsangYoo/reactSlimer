import ACProduct from './acproduct'
import {ACEGender, ACEMaritalStatus} from '../common/constant/ACEPublicStaticConfig'

type ParamType = 'addcart' | 'appearProduct' | 'buy' | 'delcart' | 'event' | 'join' | 'leave' | 'link' | 'login' | 'tel'

export type IACParams = {
  init: (type: ParamType, value?: string) => ACParams
  TYPE: {
    ADDCART: ParamType
    APPEAR_PRODUCT: ParamType
    BUY: ParamType
    DELCART: ParamType
    EVENT: ParamType
    JOIN: ParamType
    LEAVE: ParamType
    LINK: ParamType
    LOGIN: ParamType
    TEL: ParamType
  }
}

export type ACParams = {
  type: ParamType
  name?: string

  linkName?: string
  orderNumber?: string
  payMethodName?: string
  productCategoryName?: string
  productName?: string
  productPrice?: string
  tel?: string
  userAge?: number
  userGender?: ACEGender
  userId?: string
  userMaritalStatus?: ACEMaritalStatus

  products?: ACProduct[]
}

export const ACParams: IACParams = {
  TYPE: {
    ADDCART: 'addcart',
    APPEAR_PRODUCT: 'appearProduct',
    BUY: 'buy',
    DELCART: 'delcart',
    EVENT: 'event',
    JOIN: 'join',
    LEAVE: 'leave',
    LINK: 'link',
    LOGIN: 'login',
    TEL: 'tel',
  },
  init(type = ACParams.TYPE.EVENT, name?: string): ACParams {
    return {type, name}
  },
}
