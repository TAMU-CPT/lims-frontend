import React from 'react';
import { Link } from 'react-router';
import { version } from '../../package.json';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    cyan500, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

// import { ServerUrl } from '../../conf.json';
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#2C3143',
        secondaryColor: '#d0bd2a',
        accent1Color: pinkA200,
    }
});

import AppBar from 'material-ui/AppBar';

const App = ({ children }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
        <AppBar
            title="Galaxy Reports"
            // TODO: custom icon
            iconElementLeft={<Link to="/overview"><IconButton><ActionHome color={muiTheme.palette.secondaryColor}/></IconButton></Link>}
        />
        <section>
          {children}
        </section>
    </div>
  </MuiThemeProvider>
);

App.propTypes = { children: React.PropTypes.object };

export default App;
