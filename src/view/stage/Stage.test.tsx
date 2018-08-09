import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Stage from './Stage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Stage/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
