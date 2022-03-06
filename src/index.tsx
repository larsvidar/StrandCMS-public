/***** IMPORTS *****/
import React from 'react';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './Handler/Handler';
import {hydrate, render} from 'react-dom';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';


/***** APP-RENDERING *****/
const rootElement: HTMLElement | null = document.getElementById('root');
const runSnap = process.env.REACT_APP_RUN_SNAP === 'true';

if(rootElement?.hasChildNodes() && runSnap) {
    hydrate(<Provider><App/></Provider>, rootElement);
} else {
    render(<Provider><App /></Provider>, rootElement);
}


/***** SERVICE-WORKER *****/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


/***** WEBVITALS *****/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
