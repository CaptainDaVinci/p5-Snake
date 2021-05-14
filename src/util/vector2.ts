export default class Vec2 {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(x: number, y?: number): Vec2{
        let nx = this.x + x;
        let ny = this.y + (y ? y : 0);
        return new Vec2(nx, ny);
    }

    addv(oth: Vec2): Vec2 {
        return new Vec2(this.x + oth.x, this.y + oth.y);
    }

    addvit(oth: Vec2): Vec2 {
        this.x += oth.x;
        this.y += oth.y;
        return this;
    }

    subv(oth: Vec2): Vec2 {
        return new Vec2(this.x - oth.x, this.y - oth.y);
    }

    addit(x: number, y?: number): Vec2 {
        this.x += x;
        this.y += (y ? y : 0);
        return this;
    }

    mult(n: number) {
        return new Vec2(this.x * n, this.y * n);
    }

    multit(n: number) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    equals(oth: Vec2): boolean {
        return oth.x === this.x && oth.y === this.y
    }

    copy(): Vec2 {
        return new Vec2(this.x, this.y);
    }

}

