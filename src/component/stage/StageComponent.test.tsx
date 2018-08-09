import * as React from 'react';
import * as ReactDOM from 'react-dom';

import StageComponent from './StageComponent';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StageComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
