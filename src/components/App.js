/* eslint-disable no-unused-vars */
import React from 'react';
import {Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {pinkA200} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
/* eslint-enable no-unused-vars */

// import { ServerUrl } from '../../conf.json';
const muiTheme = getMuiTheme({
	palette: {
		primary1Color: '#2C3143',
		secondaryColor: '#d0bd2a',
		accent1Color: pinkA200
	}
});

const App = ({children}) => (
	<MuiThemeProvider muiTheme={muiTheme}>
		<div>
			<AppBar
				title="Galaxy Reports"
				// TODO: custom icon
				iconElementLeft={<Link to="/overview"><IconButton><ActionHome color={muiTheme.palette.secondaryColor} /></IconButton></Link>}
			/>
			<section>
				{children}
			</section>
		</div>
	</MuiThemeProvider>
);

App.propTypes = {children: React.PropTypes.object};

export default App;
