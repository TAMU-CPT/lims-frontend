// CURRENTLY UNUSED.
//
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
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
/* eslint-enable no-unused-vars */

class GenericCreationDialog extends React.Component {
	constructor(props){
		super(props);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.getDialog = this.getDialog.bind(this);
		this.defaultRender = this.defaultRender.bind(this);

		this.state = {
			open: false
		}
	}

	handleOpen() {
		console.log("Opening");
		console.log(this);
		this.setState({open: true});
		console.log(this);
	}

	handleClose() {
		console.log("CLosing");
		console.log(this);
		this.setState({open: false});
		console.log(this);
	}

	actionsSubmitCancel() {
		return [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleClose}
			/>,
			<RaisedButton
				label="Submit"
				primary={true}
				onTouchTap={this.handleClose}
			/>,
		];
	}

	getDialog(actions, content) {
		return (
			<Dialog
				title="Dialog With Actions"
				actions={actions}
				modal={false}
				open={this.state.open}
				onRequestClose={this.handleClose}
			>
				{content}
			</Dialog>
		)
	}

	getContent(){
		return (
			<span>Please override getContent()</span>
		);
	}

	defaultRender(actions, content) {
		var dialog = this.getDialog(actions, content);
		return (
			<span style={{marginLeft: '1em'}}>
				<FloatingActionButton mini={true} onTouchTap={this.handleOpen}>
					<ContentAdd />
				</FloatingActionButton>
				{Dialog}
			</span>
		);
	}

	render() {
		var actions = this.actionsSubmitCancel();
		var content = this.getContent();
		return this.defaultRender(actions, content);
	}
}

export {GenericCreationDialog};
