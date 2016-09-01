import React from 'react';
import Barcode from 'react-barcode';

var CPTBarcode = React.createClass({
	render(){
		return (
			<Barcode
				displayValue={false}
				height={this.props.height || 30}
				value={`cpt:${this.props.ns}:${this.props.id}`}
				/>
		)
	}
});

export {CPTBarcode};
