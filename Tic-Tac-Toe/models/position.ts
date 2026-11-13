
export class Position {
    public readonly X: number;
    public readonly Y: number;

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }

    isValid(positionObj: Position): boolean {
        const xPos = positionObj.X;
        const yPos = positionObj.Y;

        // todo: how to extend it ? if grid size is variable ?
        if(xPos >= 0 && xPos < 3 && yPos >= 0 && yPos < 3) {
            return true;
        }

        return false;
    }
}