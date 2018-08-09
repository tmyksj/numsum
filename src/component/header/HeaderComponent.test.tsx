import * as React from 'react';
import * as ReactDOM from 'react-dom';

import HeaderComponent from './HeaderComponent';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HeaderComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
