/* eslint-disable no-unused-vars */
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {ServerUrl} from '../../../conf.json';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Snackbar from 'material-ui/Snackbar';
/* eslint-enable no-unused-vars */

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response
	} else {
		var error = new Error(response.statusText)
		error.response = response
		throw error
	}
}

function parseJSON(response) {
	return response.json()
}


var FreezerCreationDialog = React.createClass({
	getInitialState() {
		return {
			open: false,
			location: "",
			name: "",

			ajaxToastOpen: false,
			ajaxToastMessage: "Success",
		};
	},

	handleToastClose() {
		this.setState({
			ajaxToastOpen: false,
		});
	},

	handleOpen() {
		this.setState({open: true});
	},

	handleClose() {
		this.setState({open: false});
	},

	handleLocationChange: function(e) {
		this.setState({location: e.target.value});
	},

	handleNameChange: function(e){
		this.setState({name: e.target.value});
	},

	handleClear() {
		this.setState({
			name: "",
			location: "",
		})
	},

	// TODO: https://facebook.github.io/react/docs/tutorial.html#optimization-optimistic-updates
	handleSubmit() {
		fetch(ServerUrl + '/api/web/storagelocation/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: this.state.name,
				location: this.state.location,
				box_set: [],
				container_type: "Freezer",
			}),
		})
			.then(checkStatus)
			.then(parseJSON)
			.then(function(json) {
				this.setState({
					ajaxToastMessage: "Success!",
					ajaxToastOpen: true,
				})
				this.handleClear();
				this.handleClose();
			}.bind(this)).catch(function(ex) {
				// TODO: sentry
				this.setState({
					ajaxToastMessage: "Error: Could not register storage location",
					ajaxToastOpen: true,
				})
				console.log('parsing failed', ex);
			}.bind(this));
	},

	render() {
		const actions = [
			<FlatButton
				label="Clear"
				secondary={true}
				onTouchTap={this.handleClear}
			/>,
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleClose}
			/>,
			<RaisedButton
				label="Create"
				primary={true}
				onTouchTap={this.handleSubmit}
			/>,
		];

		return (
			<span style={{marginLeft: '1em'}}>
				<FloatingActionButton mini={true} onTouchTap={this.handleOpen}>
					<ContentAdd />
				</FloatingActionButton>
				<Dialog
					title="Register a New Freezer"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					This will register a new freezer with the CPT LIMS System. Freezer contain boxes.
					<TextField
						floatingLabelText="Name"
						onChange={this.handleNameChange}
						value={this.state.name}
						/>
					<br />
					<TextField
						floatingLabelText="Location"
						onChange={this.handleLocationChange}
						value={this.state.location}
						/>
				</Dialog>
				<Snackbar
					open={this.state.ajaxToastOpen}
					message={this.state.ajaxToastMessage}
					//action={this.props.undo ? "undo" : ""}
					autoHideDuration={4000}
					onActionTouchTap={this.handleToastClose}
					onRequestClose={this.handleToastClose}
					/>
			</span>
		);
	}
})

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
	onChange(evt){
		console.log("BaseFreezerList evt ", evt);
	},

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
								<h2>
									Freezers
									<FreezerCreationDialog />
								</h2>
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
	onChange(evt){
		console.log("FreezerList evt ", evt);
	},

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
