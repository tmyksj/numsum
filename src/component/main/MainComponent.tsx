import * as React from 'react';

import StageComponent from "../stage/StageComponent";

import './MainComponent.css';

class MainComponent extends React.Component {
    public render() {
        return (
            <main className="MainComponent-main">
                <p className="MainComponent-main__description">
                    The number of the cell is added around the cell.<br/>
                    Your goal is to make all cells 0.
                </p>
                <StageComponent/>
            </main>
        );
    }
}

export default MainComponent;
