import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import DisplayModule from './DisplayModule';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

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

it('Renders DisplayModule without crashing', () => {
    render(<BrowserRouter>
        <Routes><Route><DisplayModule /></Route></Routes>
    </BrowserRouter>, container);
});