import Position from "./util/position";
import { Direction } from "./util/direction";


export default class Part {
    public currentPosition: Position;
    public targetPosition: Position
    public direction: Direction;
    public gridPosition: Position;

    constructor(gridPos: Position, direction: Direction) {
        this.direction = direction;
        this.gridPosition = gridPos;
        this.currentPosition = this.gridPosition.mul(20).add(new Position(10, 10)); 
        this.targetPosition = this.currentPosition.copy();
    }

}
