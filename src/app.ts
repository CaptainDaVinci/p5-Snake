import P5 from "p5";
import "p5/lib/addons/p5.dom";
import Grid from "./grid";
import Snake from "./snake";
import Sketcher from "./sketcher";
import { Direction } from "./util/direction";

const sketch = (p5: P5) => {
    const CANVAS_SIZE = 800;
    const GRID_SIZE = 50;
    const SCALE = CANVAS_SIZE / GRID_SIZE;
    const FRAME_RATE = 15;

    let grid: Grid;
    let snake: Snake;
    let sketcher: Sketcher;

    function initGame() {
        sketcher = new Sketcher(p5, SCALE); 
        grid = new Grid(GRID_SIZE);
        snake = new Snake();
    }

    p5.setup = () => {
        const canvas = p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
        canvas.parent("app");
        p5.background("#fff");
        
        p5.frameRate(FRAME_RATE);
        initGame();
    };

    p5.draw = () => {
        snake.move();
        if (snake.ateFood(grid.foodPos)) {
            snake.grow();
            grid.generateFoodAtRandomXY();
        }
        sketcher.drawGrid(grid); 
        sketcher.drawSnake(snake);
    };

    p5.keyPressed = () => {
        let direction: Direction | undefined = undefined;
        switch (p5.keyCode) {
          case p5.LEFT_ARROW:
            direction = Direction.Left; 
            break;
          case p5.RIGHT_ARROW:
            direction = Direction.Right;
            break;
          case p5.DOWN_ARROW:
            direction = Direction.Down;
            break;
          case p5.UP_ARROW:
            direction = Direction.Up;
            break;

        };
        snake.changeDirection(direction);
    };
};

new P5(sketch);
