import Position from "./util/position";
import { Direction, getpos, oppositeof } from "./util/direction";
import Grid, {GridState} from "./grid";
import Part from "./part";


export default class Snake {
    public body: Part[];

    constructor() {
        this.init();
    }

    init() {
        this.body = new Array(new Part(new Position(4, 1), Direction.Right), 
                               new Part(new Position(3, 1), Direction.Right), 
                               new Part(new Position(2, 1), Direction.Right), 
                               new Part(new Position(1, 1), Direction.Right));
    }
    
    get head() {
        return this.body[0];
    }

    get tail() {
        return this.body[this.body.length - 1];
    }

    changeDirection(direction: Direction | undefined) {
        if (direction !== undefined &&
             this.head.direction !== oppositeof(direction)) {
            this.head.direction = direction;
        }
    }

    eatsFood(foodPos: Position): boolean {
        return this.head.gridPosition.isEqual(foodPos);
    }

    eatsItself(): boolean {
        return this.body.slice(1).some((node) => this.head.gridPosition.isEqual(node.gridPosition));
    }

    hitsBlock(grid: Grid): boolean {
        let state = grid.getState(this.head.gridPosition.y, this.head.gridPosition.x);
        return state === GridState.Blocked;
    }

    reset() {
        this.init();
    }

    grow() {
        let part = new Part(this.tail.gridPosition.add(getpos(this.tail.direction).mul(-1)), this.tail.direction);
        //part.targetPosition = this.tail.currentPosition.copy();
        this.body.push(part);
    }

    move() {
        for (let part of this.body) {
            part.gridPosition = part.gridPosition.add(getpos(part.direction));
            part.targetPosition = part.gridPosition.mul(20).add(new Position(10, 10));
        }
        for (let i = this.body.length - 1; i > 0; --i) {
            this.body[i].direction = this.body[i - 1].direction;
        }
    }

    drift() {
        for (let part of this.body) {
            part.currentPosition = part.currentPosition.add(part.targetPosition.sub(part.currentPosition).mul(0.20));
        }
    }

}
