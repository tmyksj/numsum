import * as React from 'react';

import Stage from "../../game/stage/Stage";
import StageProperty from "../../game/stage/StageProperty";
import Point from "../../game/util/Point";

import './StageComponent.css';

class StageComponent extends React.Component<{}, {}> {

    private stage: Stage = new Stage(new StageProperty());

    constructor(
        props: {}
    ) {
        super(props);
        this.next();
    }

    public render() {
        const cellList: JSX.Element[] = [];

        for (let y = 0; y < this.stage.stageProperty.height; y++) {
            for (let x = 0; x < this.stage.stageProperty.width; x++) {
                const point = new Point(x, y);
                const value: number = this.stage.getCell(point);

                cellList.push(
                    <button key={x + "-" + y + "-" + value} onClick={this.open.bind(this, point)}>
                        {value}
                    </button>
                )
            }
            cellList.push(<br key={this.stage.stageProperty.width + "-" + y}/>);
        }

        const backBind: () => void = this.back.bind(this);

        return (
            <div>
                <div>
                    <button onClick={backBind}>Back</button>
                </div>
                <div>
                    {cellList}
                </div>
            </div>
        );
    }

    private back(): void {
        this.stage.back();
    }

    private next(): void {
        this.stage = new Stage(new StageProperty());
        this.stage.subscribe(() => {
            this.forceUpdate();

            if (this.stage.isCleared()) {
                this.next();
            }
        });
    }

    private open(
        point: Point
    ): void {
        this.stage.go(point);
    }
}

export default StageComponent;
