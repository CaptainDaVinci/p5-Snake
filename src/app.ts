import P5 from "p5";
import "p5/lib/addons/p5.dom";
import Sketcher from "./sketcher";
import Direction from "./util/direction";
import Game from "./game";
import {CANVAS_SIZE, FRAME_RATE, GRID_SIZE, TICK_RATE,SCALE} from "./constant";
import Vec2 from "./util/vector2";

const sketch = (p5: P5) => {
    let game: Game;
    let sketcher: Sketcher;
    let directionLocked: boolean = false;
    let pendingDirectionChange: Vec2 | undefined;
    let tick: number = 0;
    let mode = 'CLASSIC';
    function initGame() {
        sketcher = new Sketcher(p5, SCALE); 
        game = new Game(GRID_SIZE);
    }

    p5.setup = () => {
        const canvas = p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
        canvas.parent("app");
        p5.background("#fff");

        let chk = p5.select("#box")?.elt;
        chk.onchange = function() {
            if (chk.checked) {
                mode = 'SMOOTH';
            } else {
                mode = 'CLASSIC';
            }
        }
        
        p5.frameRate(FRAME_RATE);
        initGame();
    };

    p5.draw = () => {
        game.driftSnake();
        if (tick % TICK_RATE === 0) {
            game.checkState();
            game.tick();
            directionLocked = false;
        }
        tick++;
        sketcher.drawGrid(game.grid); 
        sketcher.drawSnake(game.snake, mode);
    };

    p5.keyPressed = () => {
        let direction: Vec2 | undefined = undefined;
        switch (p5.keyCode) {
          case p5.LEFT_ARROW:
            direction = Direction.left; 
            break;
          case p5.RIGHT_ARROW:
            direction = Direction.right;
            break;
          case p5.DOWN_ARROW:
            direction = Direction.down;
            break;
          case p5.UP_ARROW:
            direction = Direction.up;
            break;

        };
        if (direction !== undefined) {
            pendingDirectionChange = direction;
        }
        if (!directionLocked && pendingDirectionChange !== undefined) {
            game.changeSnakeDirection(pendingDirectionChange);
            directionLocked = true;
            pendingDirectionChange = undefined;
        }
    };
};

new P5(sketch);
