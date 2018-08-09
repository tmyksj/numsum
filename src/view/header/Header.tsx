import * as React from 'react';

import './Header.css';

class Header extends React.Component {
    public render() {
        return (
            <header className="Header-header">
                <h1 className="Header-header__title">numsum</h1>
            </header>
        );
    }
}

export default Header;
