class EventBinding {
    constructor() {
        this.el     = '';
        this.on     = '';
        this.bind   = '';
        this.ref    = null;
        this.fn     = null;

        Object.seal(this);
    }
}

export default EventBinding;