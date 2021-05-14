import {SCALE} from "./constant";
import Vec2 from "./util/vector2";

export default class Part {
    public currentPosition: Vec2;
    public targetPosition: Vec2;
    public gridPosition: Vec2;
    public direction: Vec2;

    constructor(gridPos: Vec2, direction: Vec2) {
        this.direction = direction;
        this.gridPosition = gridPos;
        this.currentPosition = this.gridPosition.add(0.5, 0.5).multit(SCALE);
        this.targetPosition = this.currentPosition.copy();
    }

    copy(): Part {
        return new Part(this.gridPosition.copy(), this.direction.copy());
    }

}
