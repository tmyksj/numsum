import * as React from 'react';

import FooterComponent from "./footer/FooterComponent";
import HeaderComponent from "./header/HeaderComponent";
import MainComponent from "./main/MainComponent";

import './AppComponent.css';

class AppComponent extends React.Component {
    public render() {
        return (
            <div>
                <HeaderComponent/>
                <MainComponent/>
                <FooterComponent/>
            </div>
        );
    }
}

export default AppComponent;
