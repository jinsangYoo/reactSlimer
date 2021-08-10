import ControlTower from '../../common/controltower/ControlTower';
import ACELog from '../../common/logger/ACELog';
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
            ACELog.d(ACEControlTowerForOne._TAG, 'failed receive policy will disable SDK.');
            this._isSDKEnabled = isSucceedRequestPolicy;
        }
        this._isCompletePolicy = isCompletePolicy;
    }
}
ACEControlTowerForOne._TAG = 'towerForOne';
//# sourceMappingURL=ACEControlTowerForOne.js.map