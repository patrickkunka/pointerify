interface IPhysics {
    inertia?: boolean;
    friction?: number;
    easing?: (t: number) => number;
}

export default IPhysics;