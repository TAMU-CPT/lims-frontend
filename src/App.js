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
import SvgIcon from 'material-ui/SvgIcon'
var style = require('./App.scss');

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

const HomeIcon = function(props){
	const LogoStyle = {
		fill: '#ffffff',
		fillOpacity: '1',
	}

	return (
		<SvgIcon>
			<g transform="scale(0.1) translate(-260, -320)" style={LogoStyle}>
				<path d="m 364.91415,345.52024 -80.09939,52.0569 41.05656,0 z"  />
				<path d="m 377.12132,337.57736 -45,60 90,0 z"  />
				<path d="m 277.12132,402.57714 0,90.00022 44.99999,-90.00022 z"  />
				<path d="m 327.12132,403.75759 -46.92002,93.81977 93.84004,0 z"  />
				<path d="m 377.12132,492.57737 -45,-90.00023 90,0 z"  />
				<path d="m 427.12132,403.75759 -46.92,93.81977 93.84002,0 z"  />
				<g transform="translate(2.1213236,2.1213201)" >
					<path d="m 372.5,500.45604 -91.34,0 91.34,60 z"  />
					<path  d="m 377.5,500.45604 91.34,0 -91.34,60 z" />
				</g>
				<path d="m 463.20082,421.81664 -10.10723,2.22411 0.24648,6.28661 c -2.18689,1.00004 -4.22206,2.24586 -6.09375,3.71875 l 4.34375,8.6875 c 3.33863,-3.20756 7.75722,-5.31259 12.6875,-5.5625 0.33875,-0.0172 0.68823,0 1.03125,0 10.97666,0 19.875,8.89834 19.875,19.875 0,9.9155 -7.28632,18.06592 -16.78125,19.5625 l 4.3125,8.6875 c 5.17358,-1.3536 9.7829,-4.08136 13.4375,-7.75 l 5.81694,2.41345 5.24204,-8.18045 -4.46523,-4.38925 c 1.22668,-3.2132 1.90625,-6.68969 1.90625,-10.34375 0,-0.14762 0.002,-0.29039 0,-0.4375 l 5.82858,-2.34191 -2.0268,-9.81082 -6.48928,0.34023 c -1.50648,-3.27124 -3.58384,-6.22999 -6.125,-8.71875 l 2.78753,-5.5098 -8.79917,-5.68398 -4.20711,4.69378 c -3.20892,-1.20543 -6.68296,-1.875 -10.3125,-1.875 -0.0417,0 -0.0833,-1.8e-4 -0.125,0 z"  />
				<g transform="translate(418.86705,383.18754)" >
					<path d="m 36.034023,-14.794082 c 5.767942,0.22031 6.253725,0.232907 12.440438,0.408338 l 1.499112,7.4751431 c -5.603623,3.2383892 -5.838282,3.3546568 -11.017655,6.69826343 L 37.510527,11.060285 c 4.521412,3.761737 5.345942,4.552609 9.671157,8.460821 l -2.517176,5.325006 C 38.822083,24.662337 37.835941,24.485626 31.642642,23.469294 l -7.795774,8.270599 4.614473,10.72652 c -0.47087,1.583513 -0.540627,2.762559 -1.299491,4.07386 C 10.698952,14.737468 11.190001,15.174965 10.087158,13.734201 9.3113438,12.72067 8.6474071,11.335858 -24.633324,-31.614897 c -4.648326,-5.802197 -5.143236,-6.355982 -5.216749,-6.564869 -0.07872,-0.223678 -0.08832,-0.592168 -0.598233,-5.860511 l 6.542173,-2.953393 c 3.607833,3.85594 4.81995,4.876275 9.813521,9.413625 l 9.0417472,-2.608582 c 1.9549996,-5.660634 2.3339563,-6.401032 4.6277088,-12.405463 l 7.84276,0.374423 c 0.5897273,5.45574 0.7069586,6.326342 1.769276,13.026749 l 11.024878,4.733375 c 5.303714,-3.855633 6.066096,-4.368428 10.835941,-7.40737 l 6.035627,5.165454 c -3.182513,5.578677 -3.508252,6.100249 -6.882754,12.031756 z"  />
				</g>
				<g transform="translate(-1.1298485,-7.875)">
					<path d="m 375.26563,323.87781 0,18.59375 11.15625,7.125 14.5625,-9.28125 z"  />
					<path d="m 426.65625,323.875 c -13.20657,8.4621 -27.95095,17.82722 -40.28125,25.6875 l 14.5625,9.28125 c 9.12513,-5.78687 16.51163,-10.50417 25.71875,-16.375 z"  />
				</g>
			</g>
		</SvgIcon>
	)
}

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
						onTitleTouchTap={() => {this.props.history.push('/')}}
						className={style.appBar}
						iconElementLeft={
							<IconButton>
							<HomeIcon />
							</IconButton>
						}
					/>
					<section>
					{HomeIcon}
						{conditional_crumbs}
						{this.props.children}
					</section>
				</div>
			</MuiThemeProvider>
		)
	}
})

App.propTypes = {children: React.PropTypes.object};

export default App;
