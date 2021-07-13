import { isEmpty } from '../../common/util/TextUtils';
import ACECONSTANT from '../../common/constant/ACEConstant';
export default class ACEParameters {
    getIsNeedSetNewSession() {
        return this.isNeedSetNewSession;
    }
    setIsNeedSetNewSession(value) {
        this.isNeedSetNewSession = value;
    }
    getPatch() {
        if (isEmpty(this.patch)) {
            this.patch = ACECONSTANT.PATCH;
        }
        return this.patch;
    }
    setPatch(value) {
        if (isEmpty(value)) {
            this.patch = ACECONSTANT.PATCH;
        }
        else {
            this.patch = value;
        }
    }
}
//# sourceMappingURL=ACEParameters.js.map