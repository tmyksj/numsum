import * as React from 'react';

import FooterComponent from "./footer/FooterComponent";
import HeaderComponent from "./header/HeaderComponent";

import './AppComponent.css';

class AppComponent extends React.Component {
    public render() {
        return (
            <div>
                <HeaderComponent/>
                <FooterComponent/>
            </div>
        );
    }
}

export default AppComponent;
