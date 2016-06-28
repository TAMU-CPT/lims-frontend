import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import Overview from './components/Overview';
import Users from './components/Users';
import UserDetail from './components/UserDetail';

window.React = React;

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
    document.getElementById('content')
);
