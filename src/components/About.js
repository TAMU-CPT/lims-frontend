import React from 'react';
import InlineEdit from 'react-edit-inline';
import { ServerUrl, ApiKey } from '../../conf.json';
import $ from 'jquery';

var About = React.createClass({
    render: function () {
        return (
            <div>
                <h2>About</h2>
                <p>
                    ReactJS application to replace Galaxy Reports
                </p>
            </div>
        )
    }
});

export default About;
