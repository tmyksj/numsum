import Point from "../util/Point";
import StageProperty from "./StageProperty";

export default class {
    public readonly stageProperty: StageProperty;

    private cellList: number[];

    constructor(
        stageProperty: StageProperty
    ) {
        this.stageProperty = stageProperty;
        this.initializeStage();
    }

    public getCell(point: Point): number {
        return this.cellList[point.x + point.y * this.stageProperty.width];
    }

    private initializeStage(): void {
        this.cellList = new Array<number>(this.stageProperty.width * this.stageProperty.height).fill(0);

        for (let i = 0; i < this.stageProperty.difficulty; i++) {
            if (this.cellList.indexOf(0) === -1) {
                break;
            }

            const zeroIndex: number[] = this.cellList.map((value: number, index: number, array: number[]) => {
                return value === 0 ? index : null;
            }).filter((value: number, index: number, array: number[]) => {
                return value !== null;
            }).map((value: number, index: number, array: number[]) => {
                return value!;
            });

            const centerIndex: number = zeroIndex[Math.random() * zeroIndex.length];
            const centerValue: number = Math.random() * this.stageProperty.max;

            this.cellList[centerIndex] = centerValue;
            this.neighborIndex(centerIndex).forEach((value: number, index: number, array: number[]) => {
                this.cellList[value] =
                    (this.cellList[value] - centerValue + this.stageProperty.max) % this.stageProperty.max;
            });
        }
    }

    private neighborIndex(centerIndex: number): number[] {
        return [
            centerIndex - this.stageProperty.width - 1,
            centerIndex - this.stageProperty.width,
            centerIndex - this.stageProperty.width + 1,
            centerIndex - 1,
            centerIndex + 1,
            centerIndex + this.stageProperty.width - 1,
            centerIndex + this.stageProperty.width,
            centerIndex + this.stageProperty.width + 1,
        ].filter((value: number, index: number, array: number[]) => {
            return 0 <= value && value < this.stageProperty.width * this.stageProperty.height;
        });
    }
}
