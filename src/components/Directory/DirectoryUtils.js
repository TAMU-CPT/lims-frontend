import React from 'react';
import SvgIconPhone from 'material-ui/svg-icons/communication/phone';

var PhoneLink = React.createClass({
	render() {
		if(!this.props.number){
			return (<span />)
		}
		return (
			<a href={`tel:${this.props.number}`}>
				<SvgIconPhone />
				{this.props.number}
			</a>
		)
	}
});

export {PhoneLink};
