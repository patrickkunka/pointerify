import Axis from '../../Shared/Constants/Axis';

interface IBehavior {
    pressDuration?: number;
    allowAxis?: Axis;
    clampAxis?: Axis;
    pinch?: boolean;
}

export default IBehavior;