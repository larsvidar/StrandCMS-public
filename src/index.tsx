import React from 'react';
import {hydrate, render} from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Provider from './Handler/Handler';

/***** APP-RENDERING *****/
const rootElement: HTMLElement | null = document.getElementById('root');
const runSnap = process.env.REACT_APP_RUN_SNAP === 'true';

if(rootElement?.hasChildNodes() && runSnap) {
    hydrate(<Provider><App/></Provider>, rootElement);
} else {
    render(<Provider><App /></Provider>, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
