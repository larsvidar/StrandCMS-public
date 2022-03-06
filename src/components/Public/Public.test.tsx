import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import Public from './Public';
import {BrowserRouter, Route} from 'react-router-dom';

let container: any = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});
    
afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('Renders Public without crashing', () => {
    render(<BrowserRouter>
        <Route render={() => <Public />} />
    </BrowserRouter>, container);
});