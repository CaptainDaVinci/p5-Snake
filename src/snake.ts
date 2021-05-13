import Position from "./util/position";
import { Direction, oppositeof } from "./util/direction";
import Grid, {GridState} from "./grid";


export default class Snake {
    private _body: Position[];
    private currentDirection: Direction;
    public lastTailPosition: Position;

    constructor() {
        this.init();
    }

    init() {
        this._body = new Array(new Position(4, 1), new Position(3, 1), new Position(2, 1), new Position(1, 1));
        this.currentDirection = Direction.Right;
        this.lastTailPosition = this.head;
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

    eatsFood(foodPos: Position): boolean {
        return this.head.isEqual(foodPos);
    }

    eatsItself(): boolean {
        return this.body.slice(1).some((node) => this.head.isEqual(node));
    }

    hitsBlock(grid: Grid): boolean {
        let state = grid.getState(this.head.y, this.head.x);
        return state === GridState.Blocked;
    }

    reset() {
        this.init();
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
        this.lastTailPosition = this.body.pop();
    }

}
