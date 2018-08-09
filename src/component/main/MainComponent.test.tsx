import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MainComponent from './MainComponent';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MainComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
