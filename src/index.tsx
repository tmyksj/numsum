import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppComponent from "./component/AppComponent";

import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
    <AppComponent/>,
    document.querySelector('body > div') as HTMLElement
);

registerServiceWorker();
