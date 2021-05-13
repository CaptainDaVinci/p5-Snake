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
        this.lerpStep = 0.2;
    }

    fillColour(state: GridState) {
       switch (state) {
          case GridState.Food:
            this.p5.fill(255, 71, 71);
            break;
          case GridState.Blocked:
            this.p5.fill(45, 45, 45);
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
        let radius = this.scale / 2;
        let maxRadius = radius;
        let size = 0.7 / snake.body.length;
        let px, py;
        for (let i = 0; i < snake.body.length; ++i) {
            let currPos = snake.body[i];
            let prevPos = i === snake.body.length - 1 ? snake.lastTailPosition : snake.body[i + 1];
            let x = (this.p5.lerp(prevPos.x, currPos.x, this.lerpAmount) + 0.5) * this.scale; 
            let y = (this.p5.lerp(prevPos.y, currPos.y, this.lerpAmount) + 0.5) * this.scale;

            this.p5.strokeWeight(0.1);
            let alpha = 180;
            if (i == 0) {
                // for snake head.
                alpha = 255;   
            } 
            this.p5.fill(181, 212, 8, alpha);
            this.p5.arc(x, y, radius * 2, radius * 2, 0, this.p5.PI * 2);
            if (i != 0) {
                this.p5.stroke(6, 189, 10, alpha * 0.85);
                this.p5.strokeWeight(2 * radius);
                this.p5.line(x, y, px, py);
            }

            radius -= maxRadius * size;
            px = x;
            py = y;
        }
        this.lerpAmount += this.lerpStep;
        if (this.lerpAmount >= 1) {
            this.lerpAmount = 0;
        }
    }

}
