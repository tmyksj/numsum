import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from "./view/App";

import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
    <App/>,
    document.querySelector('body > div') as HTMLElement
);
registerServiceWorker();
