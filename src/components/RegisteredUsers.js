import React from 'react';
import InlineEdit from 'react-edit-inline';
import { ServerUrl, ApiKey } from '../../conf.json';
import $ from 'jquery';

var RegisteredUsers = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Registered Users</h1>
            </div>
        )
    }
});

export default RegisteredUsers;
