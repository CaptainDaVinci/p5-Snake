import Direction, { oppositeof } from "./util/direction";
import Grid, {GridState} from "./grid";
import Part from "./part";
import {SCALE, SPEED_MUL} from "./constant";
import Vec2 from "./util/vector2";


export default class Snake {
    public body: Part[];

    constructor() {
        this.init();
    }

    init() {
        this.body = new Array();
        for (let i = 4; i > 0; --i) {
            this.body.push(new Part(new Vec2(i, 1), Direction.right));
        }
    }
    
    get head() {
        return this.body[0];
    }

    get tail() {
        return this.body[this.body.length - 1];
    }

    changeDirection(direction: Vec2 | undefined) {
        if (direction !== undefined &&
             !this.head.direction.equals(oppositeof(direction))) {
            this.head.direction = direction;
        }
    }

    eatsFood(foodPos: Vec2): boolean {
        return this.head.gridPosition.equals(foodPos);
    }

    eatsItself(): boolean {
        return this.body.slice(1).some((node) => this.head.gridPosition.equals(node.gridPosition));
    }

    hitsBlock(grid: Grid): boolean {
        let state = grid.getState(this.head.gridPosition.y, this.head.gridPosition.x);
        return state === GridState.Blocked;
    }

    reset() {
        this.init();
    }

    grow() {
        let part = new Part(this.tail.gridPosition.addv(this.tail.direction.mult(-1)), this.tail.direction.copy());
        this.body.push(part);
    }

    move() {
        for (let part of this.body) {
            part.gridPosition.addit(part.direction.x, part.direction.y);
            part.targetPosition = part.gridPosition.add(0.5, 0.5).multit(SCALE);
        }
        for (let i = this.body.length - 1; i > 0; --i) {
            this.body[i].direction = this.body[i - 1].direction.copy();
        }
    }

    drift() {
        for (let part of this.body) {
            part.currentPosition.addvit(part.targetPosition.subv(part.currentPosition).multit(SPEED_MUL));
        }
    }

}
