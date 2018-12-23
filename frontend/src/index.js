import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './static/index.css';

import App from './js/App';
import SearchListComponent from './js/SearchResults'
// import SearchComponent from './js/Search';

import * as serviceWorker from './js/serviceWorker';
// import SearchComponent from './js/Search';

// const AppRouter = () => (
//     <Router>
//       <div>
//         {/* <Route path="/register" component={RegisterPage} /> */}
//         {/* <Route path="/login/" component={Login} /> */}
//         <Route path="//" component={App} />
//         <Route path="/createBookList" component={SearchComponent} />
//       </div>
//     </Router>
//   );

// ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/createBookList" render={ (routeInfo, ...rest) => <SearchListComponent title={routeInfo.location.state.title}/> } />
        </Switch>
    </BrowserRouter>
    ), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();