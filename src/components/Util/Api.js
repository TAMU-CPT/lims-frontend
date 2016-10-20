import React from 'react';
import {ServerUrl} from '../../../conf.json';

function CheckStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response
	} else {
		var error = new Error(response.statusText)
		error.response = response
		throw error
	}
}

function ParseJSON(response) {
	return response.json()
}

class GenericApiClass extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'data': {}
		}
	}

	loadDataFromServer(apiRoute) {
		fetch(ServerUrl + apiRoute)
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				this.setState({
					data: json
				});
			}.bind(this)).catch(function(ex) {
				console.log('parsing failed', ex);
			});
	}

	render() {
		return (
			<div>Not implemented</div>
		)
	}
}

export {GenericApiClass, CheckStatus, ParseJSON};
