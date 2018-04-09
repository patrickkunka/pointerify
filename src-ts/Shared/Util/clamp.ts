/**
 * Clamps a floating point number to within a provided range.
 */

function clamp(float: number, min?: number, max?: number): number {
    min = typeof min === 'number' ? min : 0;
    max = typeof max === 'number' ? max : 1;

    return Math.max(min, Math.min(max, float));
}

export default clamp;