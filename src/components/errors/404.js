/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

var error404 = React.createClass({
	render() {
		return (
			<div>
				<h2>Not found</h2>
				<p>
					We are sorry but we could not find what you are looking for. <a href="#/">Go Home</a>
				</p>
			</div>
		);
	}
});

export default error404;
