import P5 from "p5";
import "p5/lib/addons/p5.dom";
import Sketcher from "./sketcher";
import { Direction } from "./util/direction";
import Game from "./game";

const sketch = (p5: P5) => {
    const CANVAS_SIZE = 800;
    const GRID_SIZE = 50;
    const SCALE = CANVAS_SIZE / GRID_SIZE;
    const FRAME_RATE = 7;

    let game: Game;
    let sketcher: Sketcher;
    let directionLocked: boolean = false;

    function initGame() {
        sketcher = new Sketcher(p5, SCALE); 
        game = new Game(GRID_SIZE);
    }

    p5.setup = () => {
        const canvas = p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
        canvas.parent("app");
        p5.background("#fff");
        
        p5.frameRate(FRAME_RATE);
        initGame();
    };

    p5.draw = () => {
        sketcher.drawGrid(game.grid); 

        game.tick();
        game.checkState();

        sketcher.drawSnake(game.snake);
        directionLocked = false;
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
        if (!directionLocked && direction !== undefined) {
            game.changeSnakeDirection(direction);
            directionLocked = true;
        }
    };
};

new P5(sketch);