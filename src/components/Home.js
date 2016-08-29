/* eslint-disable no-unused-vars */
import React from 'react';
import {Link} from 'react-router';
var Breadcrumbs = require('react-breadcrumbs');
/* eslint-enable no-unused-vars */
import {ServerUrl} from '../../conf.json';
import HomeApp from './HomeApp.js';
//import {Grid, Row, Col} from 'react-flexbox-grid';
/* global fetch */
import 'whatwg-fetch';
import moment from 'moment';

var Home = React.createClass({
	getInitialState() {
		return {
			apps: []
		};
	},

	loadDataFromServer() {
		fetch(ServerUrl + '/api/apps')
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				this.setState({
					apps: json
				});
			}.bind(this)).catch(function(ex) {
				console.log('parsing failed', ex);
			});
	},

	componentDidMount() {
		this.loadDataFromServer();
	},

	render() {

		var apps = this.state.apps.map(function(item, index){
			return (
				<Col xs={12} sm={6} md={4}>
					<HomeApp item={item} key={index}/>
				</Col>
			)
		});

		return (
			<div>
				<h1>Home</h1>
				<Grid>
					<Row>
					{apps}
					</Row>
				</Grid>
			</div>
		);
	}
});

export default Home;
