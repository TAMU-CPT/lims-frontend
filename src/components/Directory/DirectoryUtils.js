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
import SvgIconPhone from 'material-ui/svg-icons/communication/phone';

import {List, ListItem} from 'material-ui/List';
import {ServerUrl} from '../../../conf.json';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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
});

var Phone = React.createClass({
	render() {
		if(!this.props.number){
			return (<span />)
		}
		return (
			<div>
				<a href={`tel:${this.props.number}`}>
					<SvgIconPhone />
					{this.props.number}
				</a>
			</div>
		)
	}
});


export {Phone, OrgChip};
