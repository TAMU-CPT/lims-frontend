/* eslint-disable no-unused-vars */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router'
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Barcode from 'react-barcode';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {GenericApiClass} from '../Util/Api';
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
		var sample_type = this.props.data.sample_type ? this.props.data.sample_type.name : "Null";
		var position = [0, 0];
		if(this.props.data.latlon){
			position = [this.props.data.latlon[1], this.props.data.latlon[0]];
		}

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
});

var BaseLysateDetail = React.createClass({
	render(){
		var sample_type = this.props.data.sample_type ? this.props.data.sample_type.name : "Null";
		var hosts = [];
		if (this.props.data.hosts){
			hosts = this.props.data.hosts.map(function(item, index){
				return (
					<li key={index}>
						<span className={tubeStyle['bacterial-host']}>{item.genus} {item.species}</span> {item.strain}
					</li>
				)
			});
		}

		var env_samples = [];
		if (this.props.data.env_sample_data){
			env_samples = this.props.data.env_sample_data.map(function(item, index){
				return (
					<li key={index}>
						<Link to={`/lims/env_sample/${item.tube.id}/`}>
							{item.sample_type.name} sample; {item.description}
						</Link>
					</li>
				)
			});
		}


		return (
			<Table selectable={false}>
				<TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>
						<TableHeaderColumn colSpan="2">
							<h2>{this.props.data.name}</h2>
						</TableHeaderColumn>
					</TableRow>

				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					<TableRow>
						<TableRowColumn style={{width: '20em'}}>Isolation Date</TableRowColumn>
						<TableRowColumn>{this.props.data.isolation}</TableRowColumn>
					</TableRow>
					<TableRow>
						<TableRowColumn>Host(s)</TableRowColumn>
						<TableRowColumn><ul>{hosts}</ul></TableRowColumn>
					</TableRow>
					<TableRow>
						<TableRowColumn>Legacy ID(s)</TableRowColumn>
						<TableRowColumn>{this.props.data.oldid}</TableRowColumn>
					</TableRow>
					<TableRow>
						<TableRowColumn>Environmental Sample(s)</TableRowColumn>
						<TableRowColumn><ul>{env_samples}</ul></TableRowColumn>
					</TableRow>
					<TableRow>
						<TableRowColumn>Owner / Source</TableRowColumn>
						<TableRowColumn></TableRowColumn>
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
});

class EnvSampleDetail extends GenericApiClass {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		this.loadDataFromServer(
			`/api/web/environmentalsample/${this.props.params.sampleId}/`
		);
	}

	render() {
		return (
			<BaseEnvSampleDetail data={this.state.data} />
		)
	}
}

class LysateDetail extends GenericApiClass {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		this.loadDataFromServer(
			`/api/web/lysate/${this.props.params.sampleId}/`
		);
	}

	render() {
		return (
			<BaseLysateDetail data={this.state.data} />
		)
	}
}

export {EnvSampleDetail, LysateDetail};
