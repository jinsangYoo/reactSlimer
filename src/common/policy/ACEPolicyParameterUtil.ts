export default class ACEPolicyParameterUtil {
  private static instance: ACEPolicyParameterUtil

  public static getInstance(): ACEPolicyParameterUtil {
    return this.instance || (this.instance = new this())
  }

  private constructor() {}

  public savePolicy() {}
}
