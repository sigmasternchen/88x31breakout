
export class Position {
    public readonly _x: number;
    public readonly _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    public moveInDirection(phi: number, distance: number): Position {
        return new Position(
            this._x + Math.cos(phi) * distance,
            this._y - Math.sin(phi) * distance
        );
    }
}