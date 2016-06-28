/* eslint-disable no-unused-vars */
import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
/* eslint-enable no-unused-vars */
import {render} from 'react-dom';
import App from './components/App';
import Overview from './components/Overview';
import Users from './components/Users';
import UserDetail from './components/UserDetail';

/* eslint-disable no-undef */
window.React = React;
/* eslint-enable no-undef */

render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path="/overview" component={Overview} />
                <Route path="/users" component={Users} />
                <Route path="/users/:id" component={UserDetail} />
            </Route>
        </Router>
    ),
    /* eslint-disable no-undef */
    document.getElementById('content')
    /* eslint-enable no-undef */
);
