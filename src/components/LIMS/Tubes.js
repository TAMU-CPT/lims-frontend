/* eslint-disable no-unused-vars */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router'
import {ServerUrl} from '../../../conf.json';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Barcode from 'react-barcode';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
var tubeStyle = require('./Tubes.scss');
/* eslint-enable no-unused-vars */

var StorageLocationLink = React.createClass({
	render(){
		if(!this.props.location){
			return (<span>Unknown location</span>)
		}

		var storage = (
			<Link to={`/lims/storage/${this.props.location.storage_id}`}>
				{this.props.location.storage_name}
			</Link>
		);

		var box = (
			<Link to={`/lims/storage/${this.props.location.storage_id}/${this.props.location.box_id}`}>
				{this.props.location.box_name}
			</Link>
		);

		var tube = (
			<span>
			{this.props.location.tube_name}
			</span>
		);

		return (
			<div>
				{storage} » {box} » {tube}
			</div>
		)
	}
})

var BaseEnvSampleDetail = React.createClass({
	render(){
		console.log(this.props.data);
		var sample_type = this.props.data.sample_type ? this.props.data.sample_type.name : "Null";
		var position = [0, 0];
		if(this.props.data.latlon){
			position = [this.props.data.latlon[1], this.props.data.latlon[0]];
		}
		console.log(position);

		return (
			<Table selectable={false}>
				<TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>
						<TableHeaderColumn colSpan="2">
							<h2>{sample_type} sample</h2>
						</TableHeaderColumn>
					</TableRow>

				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					<TableRow>
						<TableRowColumn style={{width: '20em'}}>Collection Date</TableRowColumn>
						<TableRowColumn>{this.props.data.collection}</TableRowColumn>
					</TableRow>
					<TableRow>
						<TableRowColumn>Description</TableRowColumn>
						<TableRowColumn>{this.props.data.description}</TableRowColumn>
					</TableRow>
					<TableRow>
						<TableRowColumn>Sample Type</TableRowColumn>
						<TableRowColumn>{sample_type}</TableRowColumn>
					</TableRow>
					<TableRow>
						<TableRowColumn>Location</TableRowColumn>
						<TableRowColumn>
							<Map className={tubeStyle['leaflet-container']} center={position} zoom={10}>
								<TileLayer
									url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
									attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								/>
								<Marker position={position}>
									<Popup>
										<div>{sample_type}; {this.props.data.description}</div>
									</Popup>
								</Marker>
							</Map>
						</TableRowColumn>
					</TableRow>
					<TableRow>
						<TableRowColumn>Storage Location</TableRowColumn>
						<TableRowColumn>
							<StorageLocationLink location={this.props.data.tube ? this.props.data.tube.location : null} />
						</TableRowColumn>
					</TableRow>
				</TableBody>
			</Table>
		);
	}
})

var EnvSampleDetail = React.createClass({
	getInitialState() {
		return {
			data: {}
		};
	},

	loadDataFromServer(sampleId) {
		fetch(ServerUrl + '/api/web/environmentalsample/' + sampleId + '/')
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
			this.props.params.sampleId
		);
	},

	render() {
		return (
			<BaseEnvSampleDetail data={this.state.data} />
		)
	}
});

export {EnvSampleDetail};
