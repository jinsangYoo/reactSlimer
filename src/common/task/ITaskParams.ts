import ACEofAPIForOne from '../../acone/constant/ACEofAPIForOne'
import ACProduct from '../../acone/acproduct'
import {ACEGender, ACEMaritalStatus} from '../constant/ACEPublicStaticConfig'

export type IDebugParams = {}

export type IPayload = {
  keyword?: string
  linkName?: string
  orderNumber?: string
  pageName?: string
  paymentMethod?: string
  productName?: string
  productCategoryName?: string
  productPrice?: string
  products?: ACProduct[]
  userAge?: number
  userGender?: ACEGender
  userID?: string
  userMaritalStatus?: ACEMaritalStatus
  tel?: string
}

export type ITaskParams = {
  type: ACEofAPIForOne
  payload: IPayload
  error: boolean
  debugParams: IDebugParams
}
