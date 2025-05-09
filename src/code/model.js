class Position {
    constructor() {
        this.X = 0
        this.Y = 0
    }
    set x(x) {
        this.X = x < 90 && x > -90 ? x: this.X;
    }
    get x() {
        return this.X
    }
    set y(y) {
        this.Y = y < 90 && y > -90 ? y: this.Y;
    }
    get y() {
        return this.Y
    }
}
export default class Model {
    constructor() {
        this.playerPosition = new Position();
        this.playerRotation = 0;
    }
}