/* eslint-disable no-unused-vars */
import React from 'react';
import {Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {pink500, grey800} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

var Breadcrumbs = require('react-breadcrumbs');
require('./styles/main.scss');
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
		// We don't want to show crumbs on the home page.
		var conditional_crumbs;
		if(this.props.routes[1].name){
			conditional_crumbs = (
				<section>
					<Breadcrumbs
						routes={this.props.routes}
						params={this.props.params}
					/>
				</section>
			)
		}
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<AppBar
						title={"CPT LIMS"}
						iconElementLeft={
							<IconButton
								<NavigationMenu />
							</IconButton>
						}
					/>
					<section>
						{conditional_crumbs}
						<RaisedButton
							label="Toggle Drawer"
							/>
						{this.props.children}
					</section>
				</div>
			</MuiThemeProvider>
		)
	}
})

App.propTypes = {children: React.PropTypes.object};

export default App;
