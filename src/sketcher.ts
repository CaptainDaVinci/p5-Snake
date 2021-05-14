import P5 from "p5";
import Snake from "./snake";
import Grid, { GridState } from "./grid";
import Vec2 from "./util/vector2";
import {DEBUG} from "./constant";

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

    drawDebugTiles(currPos: Vec2, gridPos: Vec2) {
        this.p5.stroke(255, 0, 0);
        this.p5.strokeWeight(10);
        this.p5.point(currPos.x, currPos.y);
        this.p5.noStroke();
        this.p5.fill(150, 150, 150, 100);
        this.p5.square(gridPos.x, gridPos.y, this.scale);
    }

    drawLigaments(pos1: Vec2, pos2: Vec2, thickness: number, alpha: number) {
        this.p5.strokeCap(this.p5.ROUND);
        this.p5.stroke(6, 189, 10, alpha * 0.85);
        this.p5.strokeWeight(thickness);
        this.p5.line(pos1.x, pos1.y, pos2.x, pos2.y);
    }

    drawSnake(snake: Snake, mode: string) {
        let radius = this.scale / 1.5;
        let maxRadius = radius;
        let size = 0.7 / snake.body.length;


        for (let i = snake.body.length - 1; i >= 0; i--) {
            let currPos = snake.body[i].currentPosition;
            let gridPos = snake.body[i].gridPosition;


            if (DEBUG) {
                this.drawDebugTiles(currPos, gridPos.mult(this.scale));
            }

            let alpha = 180;
            let nextPart = i != 0 ? snake.body[i - 1] : undefined;
            this.p5.noStroke();
            this.p5.fill(181, 212, 8, alpha);
            if (mode === 'CLASSIC') {
                gridPos = gridPos.add(0.5, 0.5).multit(this.scale);
                this.p5.arc(gridPos.x, gridPos.y, radius, radius, 0, this.p5.PI * 2);
                if (nextPart !== undefined) {
                    nextPart = nextPart.gridPosition.add(0.5, 0.5).multit(this.scale);
                    this.drawLigaments(gridPos, nextPart, radius, alpha)
                } 
            } else {
                this.p5.arc(currPos.x, currPos.y, radius, radius, 0, this.p5.PI * 2);
                if (nextPart !== undefined) {
                    this.drawLigaments(currPos, nextPart.currentPosition, radius, alpha * 0.85)
                }
            }

            radius += maxRadius * size;
        }
    }

}
