import P5 from "p5";
import Snake from "./snake";
import Grid, { GridState } from "./grid";

export default class Sketcher {
    private p5: P5; 
    private scale: number;

    constructor(p5: P5, scale: number) {
        this.p5 = p5;
        this.scale = scale;
    }

    fillColour(state: GridState) {
       switch (state) {
          case GridState.Food:
            this.p5.fill(255, 0, 0);
            break;
          case GridState.Blocked:
            this.p5.fill(0, 0, 255);
            break;
          case GridState.Snake:
            this.p5.fill(0, 255, 0);
            break;
          case GridState.SnakeHead:
            this.p5.fill(0, 200, 0);
            break;
          default:
            this.p5.fill(255, 255, 255);
            break;
       }
    }

    drawGrid(grid: Grid) {
        this.p5.noStroke();
        for (let i = 0; i < grid.size; ++i) {
            for (let j = 0; j < grid.size; ++j) {
                let y = i * this.scale, x = j * this.scale;
                this.fillColour(grid.getState(i, j));
                this.p5.square(x, y, this.scale);
            }
        }
    }

    drawSnake(snake: Snake) {
        this.p5.stroke(100);
        this.p5.strokeWeight(1);

        this.fillColour(GridState.SnakeHead);
        this.p5.square(snake.head.x * this.scale, snake.head.y * this.scale, this.scale);

        this.fillColour(GridState.Snake);
        for (let i = 1; i < snake.body.length; ++i) {
            let pos = snake.body[i];
            this.p5.square(pos.x * this.scale, pos.y * this.scale, this.scale);
        }
    }
}
