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

import {List, ListItem} from 'material-ui/List';
import {ServerUrl} from '../../../conf.json';
import {Grid, Cell} from 'rgx'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
/* global fetch */
import 'whatwg-fetch';

var OrgChip = React.createClass({
	render() {
		return (
			<Link to={`/directory/orgs/${this.props.org.id}`}>
				<Chip>
					<Avatar icon={<SvgIconDomain />} />
					{this.props.org.name}
				</Chip>
			</Link>
		)
	}
})

var UserListItem = React.createClass({
	render() {
		return (
			<Link to={`/directory/users/${this.props.user.user}`}>
				<ListItem
					primaryText={this.props.user.name}
					leftAvatar={
						<Gravatar md5={this.props.user.gravatar_email} size={40} />
					}
				/>
			</Link>
		)
	}
})

var UserList = React.createClass({
	getInitialState() {
		return {
			users: []
		};
	},

	loadDataFromServer() {
		fetch(ServerUrl + '/api/dir/account/')
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				this.setState({
					users: json
				});
			}.bind(this)).catch(function(ex) {
				console.log('parsing failed', ex);
			});
	},

	componentDidMount() {
		this.loadDataFromServer();
	},

	render() {
		var users = this.state.users.map(function(item, index){
			return (
				<UserListItem key={`user${index}`} user={item} />
			)
		});

		return (
			<div>
				<List>
				{users}
				</List>
			</div>
		);
	}
});

var UserDetail = React.createClass({
	getInitialState() {
		return {
			user: {}
		};
	},

	loadDataFromServer(id) {
		fetch(ServerUrl + `/api/dir/account/${id}`)
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				this.setState({
					user: json
				});
			}.bind(this)).catch(function(ex) {
				console.log('parsing failed', ex);
			});
	},

	componentDidMount() {
		this.loadDataFromServer(this.props.routeParams.id);
	},

	render() {
		var orgs = [];
		if(this.state.user.orgs){
			orgs = this.state.user.orgs.map(function(item, index){
				return (
					<OrgChip key={`org${index}`} org={item} />
				)
			})
		}

		return (
		<div>
			<h2>{this.state.user.name}</h2>
			<Grid gutter={8}>
				<Cell min={128}>
					<Gravatar md5={this.state.user.gravatar_email} size={256} />
					{orgs}
				</Cell>
				<Cell min={256}>
					<Table selectable={false}>
						<TableBody displayRowCheckbox={false}>
						<TableRow>
							<TableRowColumn>CPT Person ID</TableRowColumn>
							<TableRowColumn>...</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn>Preferred Name</TableRowColumn>
							<TableRowColumn>{this.state.user.nickname}</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn>NetID</TableRowColumn>
							<TableRowColumn>{this.state.user.netid}</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn>Phone #</TableRowColumn>
							<TableRowColumn>{this.state.user.phone_number}</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn>Categories</TableRowColumn>
							<TableRowColumn>{this.state.user.tags}</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn>ORCID</TableRowColumn>
							<TableRowColumn>{this.state.user.orcid}</TableRowColumn>
						</TableRow>
						</TableBody>
					</Table>
				</Cell>
			</Grid>
		</div>
		);
	}
});

export {UserList, UserDetail};
