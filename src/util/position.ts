export default class Position {
    constructor(public x: number, public y: number) {
    }

    isEqual(othPos: Position): boolean {
        return this.x === othPos.x && this.y === othPos.y;
    }

    add(oth: Position): Position {
        return new Position(this.x + oth.x, this.y + oth.y);
    }

    sub(oth: Position): Position {
        return new Position(this.x - oth.x, this.y - oth.y);
    }

    mul(n: number): Position {
        return new Position(this.x * n, this.y * n);
    }

    copy(): Position {
        return new Position(this.x, this.y);
    }

    dist(oth: Position) {
        let dx = oth.x - this.x;
        let dy = oth.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
