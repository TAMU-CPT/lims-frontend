/* eslint-disable no-unused-vars */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router'
import {ServerUrl} from '../../../conf.json';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
/* eslint-enable no-unused-vars */

var BaseFreezerDetail = React.createClass({
	render(){
		var rthis = this;
		if(this.props.freezer && this.props.freezer.boxen){
			var boxen = this.props.freezer.boxen.map(function(item, index){
				return (
					<TableRow key={`box${index}`}>
						<TableRowColumn>
							<Link to={`/lims/storage/${rthis.props.freezer.id}/${item.id}`}>
								{item.name}
							</Link>
						</TableRowColumn>
					</TableRow>
				)
			});

			return (
				<div>
					<Table selectable={false}>
						<TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
							<TableRow>
								<TableHeaderColumn colSpan="1">
									<h2>Freezer Contents</h2>
								</TableHeaderColumn>
							</TableRow>
							<TableRow>
								<TableHeaderColumn>Name</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false}>
							{boxen}
						</TableBody>
					</Table>
				</div>
			);
		}

		return (
			<div>
				Empty
			</div>
		);
	}
})

var FreezerDetail = React.createClass({
	getInitialState() {
		return {
			data: []
		};
	},

	loadDataFromServer(freezerId) {
		fetch(ServerUrl + '/api/web/storagelocation/' + freezerId + '/')
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				this.setState({
					data: json
				});
			}.bind(this)).catch(function(ex) {
				console.log('parsing failed', ex);
			});
	},

	componentDidMount() {
		this.loadDataFromServer(this.props.params.freezerId);
	},

	render() {
		return (
			<BaseFreezerDetail freezer={this.state.data} />
		)
	}
});

var BaseFreezerList = React.createClass({
	//NameLocationTypeActions
	//-80 Freezer3rd floor Cold roomfreezer
	//
	render() {
		var rows = this.props.freezers.map(function(item, index){
			return (
				<TableRow key={`storage${index}`}>
					<TableRowColumn>
						<Link to={`/lims/storage/${item.id}/`}>
							{item.name}
						</Link>
					</TableRowColumn>
					<TableRowColumn>{item.location}</TableRowColumn>
					<TableRowColumn>{item.container_type}</TableRowColumn>
					<TableRowColumn>{item.box_set.length}</TableRowColumn>
				</TableRow>
			)
		});

		return (
			<div>
				<Table selectable={false}>
					<TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn colSpan="4">
								<h2>Freezers</h2>
							</TableHeaderColumn>
						</TableRow>
						<TableRow>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Location</TableHeaderColumn>
							<TableHeaderColumn>Type</TableHeaderColumn>
							<TableHeaderColumn># of Boxes</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{rows}
					</TableBody>
				</Table>
			</div>
		);
	}
});

var FreezerList = React.createClass({
	getInitialState() {
		return {
			data: []
		};
	},

	loadDataFromServer() {
		fetch(ServerUrl + '/api/web/storagelocation/')
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				this.setState({
					data: json
				});
			}.bind(this)).catch(function(ex) {
				console.log('parsing failed', ex);
			});
	},

	componentDidMount() {
		this.loadDataFromServer();
	},

	render() {
		return (
			<BaseFreezerList freezers={this.state.data} />
		);
	}
});

export {FreezerList, FreezerDetail};
