/**
 * Returns the distance between two grid coordindates.
 */

function hypotenuse(nodeA: any, nodeB: any): number {
    const squareOfsideX = Math.pow(Math.abs(nodeA.x - nodeB.x), 2);
    const squareOfSideY = Math.pow(Math.abs(nodeA.y - nodeB.y), 2);

    return Math.sqrt(squareOfsideX + squareOfSideY);
}

export default hypotenuse;