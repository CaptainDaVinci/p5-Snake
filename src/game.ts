import Grid from "./grid";
import Snake from "./snake";
import {Direction} from "./util/direction";

export default class Game {
    private _snake: Snake;
    private _grid: Grid;

    constructor(gridSize: number) {
        this._grid = new Grid(gridSize);
        this._snake = new Snake();
    }

    get snake() {
        return this._snake;
    }

    get grid() {
        return this._grid;
    }

    tick() {
        this.snake.move();    
    }

    checkState() {
        if (this.snake.eatsItself() || this.snake.hitsBlock(this.grid)) {
            this.snake.reset();
        }

        if (this.snake.eatsFood(this.grid.foodPos)) {
            this.snake.grow();
            this.grid.generateFoodAtRandomXY();
        }
    }

    changeSnakeDirection(direction: Direction) {
        this.snake.changeDirection(direction);
    }
}
