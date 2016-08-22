/* eslint-disable no-unused-vars */
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
/* eslint-enable no-unused-vars */

var TrueFalse = React.createClass({
	render() {
		return (
			<Card>
				<CardTitle title={this.props.item.name}/>
				<CardText>
				{this.props.item.description}
				</CardText>
				<CardActions>
					<a href={'#' + this.props.item.url}>
						<RaisedButton label="Go" primary={true}/>
					</a>
				</CardActions>
			</Card>
		);
	}
});

export default TrueFalse;
