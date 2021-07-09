import {Dimensions} from 'react-native'

export default class ACEParameterUtil {
  public static getResolution(): string {
    return `${Dimensions.get('window').width}*${Dimensions.get('window').height}`
  }
}
