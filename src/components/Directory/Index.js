/* eslint-disable no-unused-vars */
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Router, Route, Link, browserHistory} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
/* eslint-enable no-unused-vars */

var Directory = React.createClass({
	render() {
		return (
			<div>
				<h2>CPT Directory</h2>
				<ul>
					<li>
						<Link to={'/directory/users'}>
						Users
						</Link>
					</li>
					<li>
						<Link to={'/directory/orgs'}>
						Organisations
						</Link>
					</li>
				</ul>
			</div>
		);
	}
});

export default Directory;
