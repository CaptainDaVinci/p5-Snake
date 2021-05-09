import Position from "./util/position";
import {getRandint} from "./util/util";

export enum GridState {
    Empty,
    Food,
    Blocked,
    Snake
}


export default class Grid {
    private grid: GridState[][];
    private _size: number;
    private _foodPos: Position;

    constructor(size: number) {
        this._size = size;
        this.grid = new Array(this.size)
                        .fill(GridState.Empty)
                        .map(() => new Array(this.size)
                        .fill(GridState.Empty));
        this.generateFoodAtRandomXY();
    }

    get size() {
        return this._size;
    }

    get foodPos() {
        return this._foodPos;
    }

    getState(i: number, j:number) {
        return this.grid[i][j];
    }

    generateFoodAtRandomXY() {
        if (this.foodPos !== undefined) {
            this.grid[this.foodPos.y][this.foodPos.x] = GridState.Empty;
        }

        let x = getRandint(0, this.size - 1);
        let y = getRandint(0, this.size - 1);

        this.grid[y][x] = GridState.Food;
        this._foodPos = new Position(x, y);
    }

}
