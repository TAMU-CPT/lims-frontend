import React from 'react';
import InlineEdit from 'react-edit-inline';
import { ServerUrl, ApiKey } from '../../conf.json';
import $ from 'jquery';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import moment from 'moment';


var Users = React.createClass({
    getInitialState: function() {
        return {
            users: [],
        }
    },

    loadDataFromServer: function(){
        this.serverRequest = $.ajax({
            url: ServerUrl + "/api/users",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    users: data,
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {
        this.loadDataFromServer();
    },

    render: function () {
        var windowTitles = this.state.users.map(function(item, index){
            var created = moment.unix(item[0]).format();
            var lastack = moment.unix(item[3]).format();
            return (
                <TableRow key={index}>
                    <TableRowColumn>{item[1]}</TableRowColumn>
                    <TableRowColumn>{item[2]}</TableRowColumn>
                    <TableRowColumn>{created}</TableRowColumn>
                    <TableRowColumn>{lastack}</TableRowColumn>
                </TableRow>
            );
        });
        console.log(windowTitles);

        return (
            <div>
                <h1>Users</h1>
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}>

                        <TableRow>
                            <TableHeaderColumn>Username</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn>Created</TableHeaderColumn>
                            <TableHeaderColumn>Last Access</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        showRowHover={true}
                        stripedRows={true}
                        displayRowCheckbox={false}>
                        {windowTitles}
                    </TableBody>
                </Table>
            </div>
        )
    }
});

export default Users;
