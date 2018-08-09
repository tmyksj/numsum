import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from "./view/App";

ReactDOM.render(
    <App/>,
    document.querySelector('body > div') as HTMLElement
);
registerServiceWorker();
