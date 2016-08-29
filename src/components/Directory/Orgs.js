/* eslint-disable no-unused-vars */
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
/* eslint-enable no-unused-vars */
import {Link} from 'react-router'
import Gravatar from 'react-gravatar'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import SvgIconDomain from 'material-ui/svg-icons/social/domain';
import {Phone} from './DirectoryUtils';
import {List, ListItem} from 'material-ui/List';
import {ServerUrl} from '../../../conf.json';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
/* global fetch */
import 'whatwg-fetch';

var OrgListItem = React.createClass({
	render() {
		return (
			<Link to={`/directory/orgs/${this.props.org.id}`}>
				<h2>
					{this.props.org.name}
				</h2>
			</Link>
		)
	}
})

var OrgList = React.createClass({
	getInitialState() {
		return {
			orgs: []
		};
	},

	loadDataFromServer() {
		fetch(ServerUrl + '/api/dir/org/')
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				this.setState({
					orgs: json
				});
			}.bind(this)).catch(function(ex) {
				console.log('parsing failed', ex);
			});
	},

	componentDidMount() {
		this.loadDataFromServer();
	},

	render() {
		var orgs = this.state.orgs.map(function(item, index){
			return (
				<OrgListItem key={`org{index}`} org={item} />
			)
		});

		return (
			<div>
				<List>
				{orgs}
				</List>
			</div>
		);
	}
});

var OrgDetail = React.createClass({
	getInitialState() {
		return {
			org: {}
		};
	},

	loadDataFromServer(id) {
		fetch(ServerUrl + `/api/dir/org/${id}`)
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				this.setState({
					org: json
				});
			}.bind(this)).catch(function(ex) {
				console.log('parsing failed', ex);
			});
	},

	componentDidMount() {
		this.loadDataFromServer(this.props.routeParams.id);
	},

	render() {
		var addr = [];

		if(this.state.org.street_address){
			addr = this.state.org.street_address.split('\n').map(function(item, index){
				return (<div key={index}>{item}</div>)
			});
		}

		return (
			<div>
				<h2>{this.state.org.name}</h2>
				<Grid>
					<Row>
						<Col xs={12} md={4}>
							<h3>Info</h3>
							{addr}
							<Phone number={this.state.org.phone_number} />

							<h3>Website</h3>
							<a href={this.state.org.website}>{this.state.org.website}</a>

							<h3>Email</h3>
							<a href={`mailto:${this.state.org.emails}`}>{this.state.org.emails}</a>
						</Col>
						<Col xs={12} md={8}>
						Testing
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
});

export {OrgList, OrgDetail};
