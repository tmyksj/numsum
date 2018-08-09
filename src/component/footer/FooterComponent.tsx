import * as React from 'react';

import './FooterComponent.css';

class FooterComponent extends React.Component {
    public render() {
        return (
            <footer className="FooterComponent-footer">
                <span className="FooterComponent-footer__copyright">(c) numsum</span>
            </footer>
        );
    }
}

export default FooterComponent;
