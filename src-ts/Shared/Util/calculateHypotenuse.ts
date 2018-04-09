import IGridCoordinate from '../Interfaces/IGridCoordinate';

/**
 * Returns the distance between two grid coordindates.
 */

function calculateHypotenuse(nodeA: IGridCoordinate, nodeB: IGridCoordinate): number {
    const squareOfsideX = Math.pow(Math.abs(nodeA.x - nodeB.x), 2);
    const squareOfSideY = Math.pow(Math.abs(nodeA.y - nodeB.y), 2);

    return Math.sqrt(squareOfsideX + squareOfSideY);
}

export default calculateHypotenuse;