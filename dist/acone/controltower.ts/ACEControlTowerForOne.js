import ControlTower from '../../common/controltower/ControlTower';
export default class ACEControlTowerForOne extends ControlTower {
    constructor() {
        super();
    }
    setIsCompletePolicy(isCompletePolicy, isSucceedRequestPolicy) {
        super.setIsCompletePolicy(isCompletePolicy, isSucceedRequestPolicy);
        if (this.isDisabled()) {
            return;
        }
        if (isCompletePolicy && isSucceedRequestPolicy) {
        }
        else if (!isSucceedRequestPolicy) {
            console.log('failed receive policy will disable SDK.');
            this._isSDKEnabled = isSucceedRequestPolicy;
        }
        this._isCompletePolicy = isCompletePolicy;
    }
}
//# sourceMappingURL=ACEControlTowerForOne.js.map