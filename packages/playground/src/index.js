import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App nonce="a1b2c3d" />, document.getElementById('root'));

registerServiceWorker();
