import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('react_container'));

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
    });
}
