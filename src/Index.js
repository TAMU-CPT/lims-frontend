/* eslint-disable no-unused-vars */
import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
/* eslint-enable no-unused-vars */
import {render} from 'react-dom';
import App from './components/App';
 //import Overview from './components/Overview';
//
import Directory from './components/Directory/Index';
import {UserList,UserDetail} from './components/Directory/Users';
//import {OrganisationList,OrganisationDetail} from './components/Directory/Organisations';

import Home from './components/Home';
/* eslint-disable no-undef */
window.React = React;
/* eslint-enable no-undef */

render(
	(
		<Router history={hashHistory}>
			<Route path="/" component={App} name="Home">
				<IndexRoute component={Home}/>
				<Route path="/directory" name="Directory">
					<IndexRoute component={Directory} />
					<Route path="/directory/users" name="Users">
						<IndexRoute component={UserList} />
						<Route path="/directory/users/:id" component={UserDetail} />
					</Route>
				</Route>
			</Route>
		</Router>
	),
	/* eslint-disable no-undef */
	document.getElementById('content')
	/* eslint-enable no-undef */
);
