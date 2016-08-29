/* eslint-disable no-unused-vars */
import React from 'react';
import {Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {pink500, grey800} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
var Breadcrumbs = require('react-breadcrumbs');
/* eslint-enable no-unused-vars */

// import { ServerUrl } from '../../conf.json';
const muiTheme = getMuiTheme({
	palette: {
		primary1Color: pink500,
		secondaryColor: grey800,
	}
});

var App = React.createClass({
	render(children){
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<AppBar
						title="CPT LIMS"
					/>
					<section>
					<Breadcrumbs
						routes={this.props.routes}
						params={this.props.params}
					/>
					</section>
					<section>
						{this.props.children}
					</section>
				</div>
			</MuiThemeProvider>
		)
	}
})
//const App = ({children}) => ;

App.propTypes = {children: React.PropTypes.object};

export default App;
