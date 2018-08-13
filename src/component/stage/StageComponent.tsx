import * as React from 'react';

import Stage from "../../game/stage/Stage";
import StageProperty from "../../game/stage/StageProperty";
import Point from "../../game/util/Point";

import './StageComponent.css';

class StageComponent extends React.Component<{}, {}> {

    private stage: Stage;

    private currentCellList: number[][];
    private currentCellListDelta: number[][];

    constructor(
        props: {}
    ) {
        super(props);
        this.newStage();
    }

    public render() {
        let pending: boolean = false;
        for (let y = 0; y < this.stage.stageProperty.height; y++) {
            for (let x = 0; x < this.stage.stageProperty.width; x++) {
                const point = new Point(x, y);
                const value = this.stage.getCell(point);

                if (this.currentCellList[y][x] !== value) {
                    pending = true;
                    this.currentCellList[y][x] =
                        (this.currentCellList[y][x]
                            + this.currentCellListDelta[y][x]
                            + this.stage.stageProperty.max) % this.stage.stageProperty.max;
                }
            }
        }

        if (pending) {
            setTimeout(() => {
                this.forceUpdate();
            }, 50);
        }

        const cellList: JSX.Element[] = [];

        for (let y = 0; y < this.stage.stageProperty.height; y++) {
            for (let x = 0; x < this.stage.stageProperty.width; x++) {
                const point = new Point(x, y);

                cellList.push(
                    <button className="StageComponent-button"
                            disabled={pending || this.currentCellList[y][x] === 0}
                            key={x + "-" + y + "-" + this.currentCellList[y][x]}
                            onClick={this.open.bind(this, point)}>
                        {this.currentCellList[y][x]}
                    </button>
                )
            }
            cellList.push(<br key={this.stage.stageProperty.width + "-" + y}/>);
        }

        const backBind: () => void = this.back.bind(this);
        const backButtonDisabled: boolean = !this.stage.isBackable();

        return (
            <div>
                <div className="StageComponent-manager">
                    <button className="StageComponent-button"
                            disabled={pending || backButtonDisabled}
                            onClick={backBind}>Back</button>
                </div>
                <div className="StageComponent-cell">
                    {cellList}
                </div>
            </div>
        );
    }

    private back(): void {
        const lo: Point = this.stage.latestOperation();
        this.resetCurrentCellListDelta();

        [
            [lo.y - 1, lo.x - 1], [lo.y - 1, lo.x], [lo.y - 1, lo.x + 1],
            [lo.y, lo.x - 1], [lo.y, lo.x + 1],
            [lo.y + 1, lo.x - 1], [lo.y + 1, lo.x], [lo.y + 1, lo.x + 1],
        ].filter((value, index, array) => {
            return 0 <= value[0] && value[0] < this.stage.stageProperty.height
                && 0 <= value[1] && value[1] < this.stage.stageProperty.width;
        }).forEach((value, index, array) => {
            this.currentCellListDelta[value[0]][value[1]] = -1;
        });

        this.stage.back();
    }

    private newStage(): void {
        this.stage = new Stage(new StageProperty());
        this.stage.subscribe(() => {
            this.forceUpdate();

            if (this.stage.isCleared()) {
                this.newStage();
            }
        });

        this.resetCurrentCellList();
        this.resetCurrentCellListDelta();
    }

    private open(
        point: Point
    ): void {
        this.resetCurrentCellListDelta();
        this.currentCellListDelta[point.y][point.x] = -1;

        this.stage.go(point);
    }

    private resetCurrentCellList(): void {
        this.currentCellList = [];
        for (let y = 0; y < this.stage.stageProperty.height; y++) {
            this.currentCellList.push([]);
            for (let x = 0; x < this.stage.stageProperty.width; x++) {
                this.currentCellList[y].push(-1);
            }
        }
    }

    private resetCurrentCellListDelta(): void {
        this.currentCellListDelta = [];
        for (let y = 0; y < this.stage.stageProperty.height; y++) {
            this.currentCellListDelta.push([]);
            for (let x = 0; x < this.stage.stageProperty.width; x++) {
                this.currentCellListDelta[y].push(1);
            }
        }
    }
}

export default StageComponent;
