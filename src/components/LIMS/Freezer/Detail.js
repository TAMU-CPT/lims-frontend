/* eslint-disable no-unused-vars */
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {ServerUrl} from '../../../../conf.json';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {ParseJSON, CheckStatus} from '../../Util/Api';
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

export default FreezerDetail;
