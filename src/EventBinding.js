class EventBinding {
    constructor() {
        this.el       = '';
        this.on       = '';
        this.bind     = '';
        this.ref      = null;
        this.fn       = null;
        this.throttle = -1;
        this.debounce = -1;
        this.passive  = true;

        Object.seal(this);
    }
}

export default EventBinding;