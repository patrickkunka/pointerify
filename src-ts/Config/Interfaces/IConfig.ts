import IBehavior from './IBehavior';
import IPhysics from './IPhysics';
import ISelectors from './ISelectors';

interface IConfig {
    behavior?: IBehavior;
    physics?: IPhysics;
    selectors?: ISelectors;
}

export default IConfig;