export default interface IACEParameterUtil {
  loadUniqueKeyForSDK(): void
  setFirstLogParameters(): void
  setLogSource(value: number): void

  getSession(): number
  setKeepSession(): void
  setNewSession(): void

  setterForString(key: string, value: string): void

  getSdkDetails(json: JSON): void

  setAdvertisingIdentifier(advertisingIdentifier: string): void
}
