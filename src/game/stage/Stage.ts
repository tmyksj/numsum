import Point from "../util/Point";
import StageProperty from "./StageProperty";

export default class {
    public readonly stageProperty: StageProperty;

    private readonly cellList: number[];
    private readonly operationList: Point[];

    private readonly subscriberList: Array<() => void>;

    constructor(
        stageProperty: StageProperty
    ) {
        this.stageProperty = stageProperty;
        this.cellList = this.generateCellList(this.stageProperty);
        this.operationList = [];
        this.subscriberList = [];
    }

    public back(): void {
        this.operationList.pop();
        this.observe();
    }

    public getCell(
        point: Point
    ): number {
        return this.currentCellList[this.pointToIndex(point)];
    }

    public go(
        point: Point
    ): void {
        this.operationList.push(point);
        this.observe();
    }

    public isBackable(): boolean {
        return this.operationList.length > 0;
    }

    public isCleared(): boolean {
        return this.currentCellList.filter((value, index, array) => {
            return value !== 0;
        }).length === 0;
    }

    public latestOperation(): Point {
        return this.operationList[this.operationList.length - 1];
    }

    public subscribe(
        subscriber: () => void
    ): void {
        this.subscriberList.push(subscriber);
    }

    private get currentCellList(): number[] {
        const currentCellList: number[] = this.cellList.slice();

        this.operationList.forEach((value, index, array) => {
            const centerIndex: number = this.pointToIndex(value);
            const centerValue: number = currentCellList[centerIndex];

            this.neighborIndex(centerIndex).forEach((value2: number, index2: number, array2: number[]) => {
                currentCellList[value2] = (currentCellList[value2] + centerValue) % this.stageProperty.max;
            });

            currentCellList[centerIndex] = 0;
        });

        return currentCellList;
    }

    private generateCellList(
        stageProperty: StageProperty
    ): number[] {
        const cellList = new Array<number>(stageProperty.width * stageProperty.height).fill(0);

        for (let i = 0; i < stageProperty.difficulty; i++) {
            if (cellList.indexOf(0) === -1) {
                break;
            }

            const zeroIndex: number[] = cellList.map((value: number, index: number, array: number[]) => {
                return value === 0 ? index : null;
            }).filter((value: number, index: number, array: number[]) => {
                return value !== null;
            }).map((value: number, index: number, array: number[]) => {
                return value!;
            });

            const centerIndex: number = zeroIndex[Math.floor(Math.random() * zeroIndex.length)];
            const centerValue: number = Math.floor(Math.random() * stageProperty.max);

            cellList[centerIndex] = centerValue;
            this.neighborIndex(centerIndex).forEach((value: number, index: number, array: number[]) => {
                cellList[value] = (cellList[value] - centerValue + stageProperty.max) % stageProperty.max;
            });
        }

        return cellList;
    }

    private neighborIndex(
        centerIndex: number
    ): number[] {
        const height: number = this.stageProperty.height;
        const width: number = this.stageProperty.width;

        const row: (lv: number) => ((value: number, index: number, array: number[]) => boolean) = (lv: number) => {
            return (value: number, index: number, array: number[]) => {
                return 0 <= value
                    && value < width * height
                    && Math.floor(value / width) === Math.floor(centerIndex / width) + lv;
            };
        };

        return [centerIndex - width - 1, centerIndex - width, centerIndex - width + 1].filter(row(-1)).concat(
            [centerIndex - 1, centerIndex + 1].filter(row(0)),
            [centerIndex + width - 1, centerIndex + width, centerIndex + width + 1].filter(row(1)));
    }

    private observe(): void {
        this.subscriberList.forEach((value, index, array) => {
            value();
        });
    }

    private pointToIndex(
        point: Point
    ): number {
        return point.x + point.y * this.stageProperty.width;
    }
}
