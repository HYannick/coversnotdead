import React from 'react';
import ReactDOM from 'react-dom';
import Covers from './components/Covers';
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Covers />, div);
});
