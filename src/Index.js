import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
/* eslint-disable no-unused-vars */
import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
/* eslint-enable no-unused-vars */
import {render} from 'react-dom';
import App from './App';
 //import Overview from './components/Overview';
//
import Directory from './components/Directory/Index';
import {FreezerList,FreezerDetail} from './components/LIMS/Freezers';
import {BoxDetail} from './components/LIMS/Boxes';
import {EnvSampleDetail} from './components/LIMS/Tubes';
import {UserList,UserDetail} from './components/Directory/Users';
import {OrgList,OrgDetail} from './components/Directory/Orgs';
import error404 from './components/errors/404';
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
					<Route path="/directory/orgs" name="Orgs">
						<IndexRoute component={OrgList} />
						<Route path="/directory/orgs/:id" component={OrgDetail} />
					</Route>
				</Route>

				<Route path="/lims" name="LIMS">
					<IndexRoute component={FreezerList} />
					<Route path="/lims/storage/:freezerId/" name="Freezer">
						<IndexRoute component={FreezerDetail} />
						<Route path="/lims/storage/:freezerId/:boxId" component={BoxDetail} name="Box"/>
					</Route>
					<Route path="/lims/env_sample/" name="Environmental Samples">
						<Route path="/lims/env_sample/:sampleId/" component={EnvSampleDetail} name="Sample"/>
					</Route>
				</Route>

			</Route>
			<Route path="*" component={error404} />
		</Router>
	),
	/* eslint-disable no-undef */
	document.getElementById('content')
	/* eslint-enable no-undef */
);
