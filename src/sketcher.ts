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
        this.lerpStep = 0.1;
    }

    fillColour(state: GridState) {
       switch (state) {
          case GridState.Food:
            this.p5.fill(255, 71, 71);
            break;
          case GridState.Blocked:
            this.p5.fill(45, 45, 45, 100);
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
                if (grid.getState(i, j) === GridState.Empty) {
                    if (i % 2) {
                        if (j % 2) {
                            this.p5.fill(230);
                        } else {
                            this.p5.fill(240);
                        }
                    } else {
                        if (j % 2) {
                            this.p5.fill(240);
                        } else {
                            this.p5.fill(230);
                        }
                    }
                } else {
                    this.fillColour(grid.getState(i, j));
                }
                this.p5.square(x, y, this.scale);
            }
        }
    }

    drawSnake(snake: Snake) {
        let radius = this.scale / 2;
        let maxRadius = radius;
        let size = 0.7 / snake.body.length;


        for (let i = snake.body.length - 1; i >= 0; i--) {
            let currPos = snake.body[i].currentPosition;
            let targetPos = snake.body[i].targetPosition;
            let gridPos = snake.body[i].gridPosition.mul(this.scale);

            //this.p5.stroke(255, 0, 0);
            //this.p5.strokeWeight(10);
            //this.p5.point(currPos.x, currPos.y);
            //this.p5.noStroke();
            //this.p5.fill(50, 50, 50, 120);
            //this.p5.square(gridPos.x, gridPos.y, this.scale);

            let alpha = 180;
            this.p5.noStroke();
            this.p5.fill(181, 212, 8, alpha);
            this.p5.arc(currPos.x, currPos.y, radius, radius, 0, this.p5.PI * 2);
            if (i != 0) {
                let nextPos = snake.body[i - 1].currentPosition;
                this.p5.stroke(6, 189, 10, alpha * 0.85);
                this.p5.strokeWeight(radius);
                this.p5.line(currPos.x, currPos.y, nextPos.x, nextPos.y);
            }

            radius += maxRadius * size;
        }
        this.lerpAmount += this.lerpStep;
        if (this.lerpAmount >= 1) {
            this.lerpAmount = 0;
        }
    }

}
