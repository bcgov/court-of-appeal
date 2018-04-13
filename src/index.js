import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Login />, document.getElementById('react_container'));
registerServiceWorker();
