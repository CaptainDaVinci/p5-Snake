import Position from "./position";

export enum Direction {
    Up, Down, Left, Right
}

export function oppositeof(direction: Direction) {
    switch (direction) {
        case Direction.Up:
            return Direction.Down;
        case Direction.Down:
            return Direction.Up;
        case Direction.Left:
            return Direction.Right;
        case Direction.Right:
            return Direction.Left;
    }
}

export function getpos(direction: Direction) {
    switch (direction) {
        case Direction.Up:
            return new Position(0, -1);
        case Direction.Down:
            return new Position(0, 1);
        case Direction.Left:
            return new Position(-1, 0);
        case Direction.Right:
            return new Position(1, 0);
    }
}
