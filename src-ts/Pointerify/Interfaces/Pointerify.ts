import merge from 'helpful-merge';

import Config  from '../../Config/Config';
import IConfig from '../../Config/Interfaces/IConfig';
import Refs    from '../Refs';

class Pointerify {
    public config: Config = new Config();
    public refs: Refs = new Refs();

    constructor(root: HTMLElement, options: IConfig) {
        this.refs.root = root;

        this.configure(options);
    }

    public configure(options: IConfig) {
        this.config = merge(this.config, options);
    }

    public refresh() {
        //
    }

    public destroy() {
        //
    }
}

export default Pointerify;