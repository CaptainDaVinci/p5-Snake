import Vec2 from "./vector2";

export default class Direction {
    static get right(): Vec2 {
        return new Vec2(1, 0);
    }

    static get left(): Vec2 {
        return new Vec2(-1, 0);
    }

    static get up(): Vec2 {
        return new Vec2(0, -1);
    }

    static get down(): Vec2 {
        return new Vec2(0, 1);
    }
}

export function oppositeof(direction: Vec2) {
    return direction.mult(-1);
}

