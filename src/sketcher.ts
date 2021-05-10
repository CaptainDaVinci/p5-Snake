import P5 from "p5";
import Snake from "./snake";
import Grid, { GridState } from "./grid";

export default class Sketcher {
    private p5: P5; 
    private scale: number;
    public lerpAmount: number;
    private lerpStep: number;

    constructor(p5: P5, scale: number) {
        this.p5 = p5;
        this.scale = scale;
        this.lerpAmount = 0;
        this.lerpStep = 0.25;
    }

    fillColour(state: GridState) {
       switch (state) {
          case GridState.Food:
            this.p5.fill(255, 71, 71);
            break;
          case GridState.Blocked:
            this.p5.fill(128, 72, 0);
            break;
          case GridState.Snake:
            this.p5.fill(0, 255, 0, 50);
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
        this.p5.noFill();
        this.fillColour(GridState.Snake);
        this.p5.stroke(1);
        this.p5.strokeWeight(1);
        let radius = 1;
        for (let i = 0; i < snake.body.length; ++i) {
            let alpha = Math.max(255 - i * 10, 50);
            this.p5.fill(6, 189, 0, alpha);

            let currPos = snake.body[i];
            let prevPos = i === snake.body.length - 1 ? snake.lastTailPosition : snake.body[i + 1];
            let x = this.p5.lerp(prevPos.x, currPos.x, this.lerpAmount); 
            let y = this.p5.lerp(prevPos.y, currPos.y, this.lerpAmount)
            this.p5.square((x + (1 - radius) / 2) * this.scale, (y + (1 - radius) / 2) * this.scale, this.scale * radius);
            radius = Math.max(0.4, radius - (1 / (snake.body.length - i + 1)));
        }
        this.lerpAmount += this.lerpStep;
        if (this.lerpAmount >= 1) {
            this.lerpAmount = 0;
        }
    }

}
