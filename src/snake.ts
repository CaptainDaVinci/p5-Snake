import Position from "./util/position";
import { Direction, oppositeof } from "./util/direction";


export default class Snake {
    private _body: Position[];
    private currentDirection: Direction;

    constructor() {
        this._body = new Array(new Position(0, 0));
        this.currentDirection = Direction.Right;
    }
    
    get body() {
        return this._body;
    }

    get head() {
        return this.body[0];
    }

    changeDirection(direction: Direction | undefined) {
        if (direction !== undefined &&
             this.currentDirection !== oppositeof(direction)) {
            this.currentDirection = direction;
        }
    }

    ateFood(foodPos: Position): boolean {
        return this.head.isEqual(foodPos);
    }

    grow() {
        this.body.unshift(this.head);
    }

    getNewPosition() {
        switch (this.currentDirection) {
            case Direction.Right:
                return new Position(this.head.x + 1, this.head.y);
            case Direction.Left:
                return new Position(this.head.x - 1, this.head.y);
            case Direction.Up:
                return new Position(this.head.x, this.head.y - 1);
            case Direction.Down:
                return new Position(this.head.x, this.head.y + 1);
        }
    }

    move() {
        let newPosition = this.getNewPosition();
        this.body.unshift(newPosition);
        this.body.pop();
    }

}
