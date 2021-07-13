import ACECONSTANT from '../../common/constant/ACEConstant'
import ACOneConstantVt from '../constant/ACOneConstantVt'
import {getRandom6CharForSTVT} from '../../common/util/RandomUtil'

export default class ACEntityForVT {
  private _map: Map<string, string>

  public constructor() {
    this._map = new Map<string, string>()
    this._map.set(ACOneConstantVt.KeyVTS, ACOneConstantVt.DefaultTS)
    this._map.set(ACOneConstantVt.KeyRandom6ForVTS, ACECONSTANT.ZERO6)

    this._map.set(ACOneConstantVt.KeyVisitCount, ACECONSTANT.ZERO)

    this._map.set(ACOneConstantVt.KeyBuyTimeTS, ACOneConstantVt.DefaultTS)
    this._map.set(ACOneConstantVt.KeyRandom6ForBuyTimeTS, ACECONSTANT.ZERO6)

    this._map.set(ACOneConstantVt.KeyBuyCount, ACECONSTANT.ZERO)

    this._map.set(ACOneConstantVt.KeyPcStamp, ACOneConstantVt.DefaultTS)
    this._map.set(ACOneConstantVt.KeyRandom6ForPcStamp, ACECONSTANT.ZERO6)
  }

  public getMap(): Map<string, string> {
    return this._map
  }

  public setDeepCopy(value: Map<string, string>) {
    if (this._map) {
      this._map = new Map<string, string>()
    }
    const _vts = value.get(ACOneConstantVt.KeyVTS) ?? ACOneConstantVt.DefaultTS
    this._map.set(ACOneConstantVt.KeyVTS, _vts)
    const _vtsRandom = value.get(ACOneConstantVt.KeyRandom6ForVTS) ?? ACECONSTANT.ZERO6
    this._map.set(ACOneConstantVt.KeyRandom6ForVTS, _vtsRandom)

    const _visitCount = value.get(ACOneConstantVt.KeyVisitCount) ?? ACECONSTANT.ZERO
    this._map.set(ACOneConstantVt.KeyVisitCount, _visitCount)

    const _buyTimeTS = value.get(ACOneConstantVt.KeyBuyTimeTS) ?? ACOneConstantVt.DefaultTS
    this._map.set(ACOneConstantVt.KeyBuyTimeTS, _buyTimeTS)
    const _buyTimeTSRandom = value.get(ACOneConstantVt.KeyRandom6ForBuyTimeTS) ?? ACECONSTANT.ZERO6
    this._map.set(ACOneConstantVt.KeyRandom6ForBuyTimeTS, _buyTimeTSRandom)

    const _buyCount = value.get(ACOneConstantVt.KeyBuyCount) ?? ACECONSTANT.ZERO
    this._map.set(ACOneConstantVt.KeyBuyCount, _buyCount)

    const _pcStamp = value.get(ACOneConstantVt.KeyPcStamp) ?? ACOneConstantVt.DefaultTS
    this._map.set(ACOneConstantVt.KeyPcStamp, _pcStamp)
    const _pcStampRandom = value.get(ACOneConstantVt.KeyRandom6ForPcStamp) ?? ACECONSTANT.ZERO6
    this._map.set(ACOneConstantVt.KeyRandom6ForPcStamp, _pcStampRandom)
  }

  public getAssembleParams(): string {
    const _vts = this.getVTSGoldMaster()
    const _visitCount = this.getVisitCount()
    const _buyTimeTS = this.getBuyTimeTSGoldMaster()
    const _buyCount = this.getBuyCount()
    const _pcStamp = this.getPcStampGoldMaster()
    return `${_vts}|${_visitCount}|${_buyTimeTS}|${_buyCount}|${_pcStamp}`
  }

  // #region GoldMaster
  public getVTSGoldMaster(): string {
    const _vts = this.getVTS() ?? ACOneConstantVt.DefaultTS
    const _random = this.getRandom6ForVTS() ?? ACECONSTANT.ZERO6

    return `${_vts}${_random}`
  }

  public getBuyTimeTSGoldMaster(): string {
    const _buyTimeTS = this.getBuyTimeTS() ?? ACOneConstantVt.DefaultTS
    const _random = this.getRandom6ForBuyTimeTS() ?? ACECONSTANT.ZERO6

    return `${_buyTimeTS}${_random}`
  }

  public getPcStampGoldMaster(): string {
    const _pcStamp = this.getPcStamp() ?? ACOneConstantVt.DefaultTS
    const _random = this.getRandom6ForPcStamp() ?? ACECONSTANT.ZERO6

    return `${_pcStamp}${_random}`
  }
  // #endregion

  // #region vts
  public getVTS(): string | undefined {
    return this._map.get(ACOneConstantVt.KeyVTS)
  }

  public setVTS(value: Date): void {
    this._map.set(ACOneConstantVt.KeyVTS, value.valueOf().toString())
  }

  public getRandom6ForVTS(): string | undefined {
    return this._map.get(ACOneConstantVt.KeyRandom6ForVTS)
  }

  public setRandom6ForVTS(value: string): void {
    this._map.set(ACOneConstantVt.KeyRandom6ForVTS, value)
  }
  // #endregion

  // #region VisitCount
  public getVisitCount(): string {
    return this._map.get(ACOneConstantVt.KeyVisitCount) ?? ACECONSTANT.ZERO
  }

  public setVisitCount(value: number): void {
    this._map.set(ACOneConstantVt.KeyVisitCount, value.toString())
  }
  // #endregion

  // #region BuyTimeTS
  public getBuyTimeTS(): string | undefined {
    return this._map.get(ACOneConstantVt.KeyBuyTimeTS)
  }

  public setBuyTimeTS(value: Date): void {
    this._map.set(ACOneConstantVt.KeyBuyTimeTS, value.valueOf().toString())
  }

  public getRandom6ForBuyTimeTS(): string | undefined {
    return this._map.get(ACOneConstantVt.KeyRandom6ForBuyTimeTS)
  }

  public setRandom6ForBuyTimeTS(value: string): void {
    this._map.set(ACOneConstantVt.KeyRandom6ForBuyTimeTS, value)
  }
  // #endregion

  // #region BuyCount
  public getBuyCount(): string {
    return this._map.get(ACOneConstantVt.KeyBuyCount) ?? ACECONSTANT.ZERO
  }

  public setBuyCount(value: number): void {
    this._map.set(ACOneConstantVt.KeyBuyCount, value.toString())
  }
  // #endregion

  // #region pcstamp
  public getPcStamp(): string | undefined {
    return this._map.get(ACOneConstantVt.KeyPcStamp)
  }

  public setPcStamp(value: Date): void {
    this._map.set(ACOneConstantVt.KeyPcStamp, value.valueOf().toString())
  }

  public getRandom6ForPcStamp(): string | undefined {
    return this._map.get(ACOneConstantVt.KeyRandom6ForPcStamp)
  }

  public setRandom6ForPcStamp(value: string): void {
    this._map.set(ACOneConstantVt.KeyRandom6ForPcStamp, value)
  }

  public setPcStampWhenNotStored() {
    var _pcStamp = this.getPcStamp()
    if (!_pcStamp || _pcStamp == ACOneConstantVt.DefaultTS) {
      this.setPcStamp(new Date())
      this.setRandom6ForPcStamp(getRandom6CharForSTVT())
      console.log(`maked pcStamp: ${this.getPcStampGoldMaster()}`)
    } else {
      console.log(`existed pcStamp: ${this.getPcStampGoldMaster()}`)
    }
  }
  // #endregion
}
