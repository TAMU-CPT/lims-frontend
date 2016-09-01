/* eslint-disable no-unused-vars */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router'
import {ServerUrl} from '../../../conf.json';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {CPTBarcode} from '../Util/Barcode';
/* eslint-enable no-unused-vars */

var BaseBoxDetail = React.createClass({
	render(){
		var rthis = this;
		var header = (
			<Grid>
				<Row>
					<Col md={6}>
						<h1>{this.props.box.name}</h1>
					</Col>
					<Col md={6}>
						<CPTBarcode ns={"B"} height={100} id={this.props.box.id} />
					</Col>
				</Row>
			</Grid>
		);

		var dna_prep = [];
		if(this.props.box && this.props.box.dna_prep){
			var dna_prep = this.props.box.dna_prep.map(function(item, index){
				return (
					<TableRow key={`dna${index}`}>
						<TableRowColumn>
						Phage DNA Preparation
						</TableRowColumn>
						<TableRowColumn>
							<Link to={`/lims/dnaprep/${item.id}/`}>
								{item.tube.name}
							</Link>
						</TableRowColumn>
						<TableRowColumn>
							<CPTBarcode ns={"D"} id={item.id} />
						</TableRowColumn>
					</TableRow>
				)
			});
		}

		var lysate = [];
		if(this.props.box && this.props.box.lysate){
			var lysate = this.props.box.lysate.map(function(item, index){
				return (
					<TableRow key={`lys${index}`}>
						<TableRowColumn>
						Lysate
						</TableRowColumn>
						<TableRowColumn>
							<Link to={`/lims/lysate/${item.id}/`}>
								{item.tube.name}
							</Link>
						</TableRowColumn>
						<TableRowColumn>
							<CPTBarcode ns={"L"} id={item.id} />
						</TableRowColumn>
					</TableRow>
				)
			});
		}

		var env_sample = [];
		if(this.props.box && this.props.box.env_sample){
			var env_sample = this.props.box.env_sample.map(function(item, index){
				return (
					<TableRow key={`env${index}`}>
						<TableRowColumn>
							Environmental Sample
						</TableRowColumn>
						<TableRowColumn>
							<Link to={`/lims/env_sample/${item.id}/`}>
								{item.tube.name}
							</Link>
						</TableRowColumn>
						<TableRowColumn>
							<CPTBarcode ns={"E"} id={item.id} />
						</TableRowColumn>
					</TableRow>
				)
			});
		}

		return (
			<div>
			{header}
				<Table selectable={false}>
					<TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn colSpan="3">
								<h2>Box Contents</h2>
							</TableHeaderColumn>
						</TableRow>
						<TableRow>
							<TableHeaderColumn>Sample Type</TableHeaderColumn>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Barcode</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{dna_prep}
						{env_sample}
						{lysate}
					</TableBody>
				</Table>
			</div>
		);
	}
})

var BoxDetail = React.createClass({
	getInitialState() {
		return {
			data: []
		};
	},

	loadDataFromServer(freezerId, boxId) {
		fetch(ServerUrl + '/api/web/box/' + boxId + '/?location=' + freezerId)
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
		this.loadDataFromServer(
			this.props.params.freezerId,
			this.props.params.boxId
		);
	},

	render() {
		return (
			<BaseBoxDetail box={this.state.data} />
		)
	}
});

export {BoxDetail};
