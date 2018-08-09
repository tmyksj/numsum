export default class {
    public readonly difficulty: number;
    public readonly height: number;
    public readonly max: number;
    public readonly width: number;

    constructor(
        difficulty: number = 10,
        height: number = 6,
        max: number = 10,
        width: number = 10
    ) {
        this.difficulty = difficulty;
        this.height = height;
        this.max = max;
        this.width = width;
    }
}
