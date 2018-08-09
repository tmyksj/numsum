import * as React from 'react';

import StageComponent from "../stage/StageComponent";

import './MainComponent.css';

class MainComponent extends React.Component {
    public render() {
        return (
            <main className="MainComponent-main">
                <p className="MainComponent-main__description">
                    The number of the cell is added around the cell.<br/>
                    If all becomes 0, the stage is clear.
                </p>
                <StageComponent/>
            </main>
        );
    }
}

export default MainComponent;
