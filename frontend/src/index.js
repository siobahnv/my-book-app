import React from 'react';
import ReactDOM from 'react-dom';
import './static/index.css';

import App from './js/App';
import SearchComponent from './js/Search';

import * as serviceWorker from './js/serviceWorker';

ReactDOM.render(
    ( < React.Fragment > 
        <App/> 
        <SearchComponent/>
        </React.Fragment>
    ),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();