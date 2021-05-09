export default class Position {
    constructor(public x: number, public y: number) {
    }

    isEqual(othPos: Position): boolean {
        return this.x === othPos.x && this.y === othPos.y;
    }
}
