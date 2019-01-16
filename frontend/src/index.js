import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import store from "./js/store/store";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import './static/index.css';

import App from './js/App';
import SearchListComponent from './js/SearchResults'
// import SearchComponent from './js/Search';

import * as serviceWorker from './js/serviceWorker';
import Register from './js/Register';
// import SearchComponent from './js/Search';

// ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/createBookList" render={ (routeInfo, ...rest) => <SearchListComponent title={routeInfo.location.state.title}/> } />
                <Route path="/register" component={Register}/>
            </Switch>
        </BrowserRouter>
    </Provider>
    ), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();