import * as React from 'react';

import './HeaderComponent.css';

class HeaderComponent extends React.Component {
    public render() {
        return (
            <header className="HeaderComponent-header">
                <h1 className="HeaderComponent-header__title">numsum</h1>
            </header>
        );
    }
}

export default HeaderComponent;
