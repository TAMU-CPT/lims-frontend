/* eslint-disable no-unused-vars */
import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Link} from 'react-router';
var Breadcrumbs = require('react-breadcrumbs');
/* eslint-enable no-unused-vars */
import {ServerUrl} from '../../conf.json';
import 'whatwg-fetch';
import moment from 'moment';

var Users = React.createClass({
    getInitialState() {
        return {
            users: []
        };
    },

    loadDataFromServer() {
        fetch(ServerUrl + '/api/users')
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                this.setState({
                    users: json
                });
            }.bind(this)).catch(function(ex) {
                console.log('parsing failed', ex);
            });
    },

    componentDidMount() {
        this.loadDataFromServer();
    },

    render() {
        var windowTitles = this.state.users.map(function(item, index) {
            var created = moment.unix(item[0]).format();
            var lastack = moment.unix(item[3]).format();
            return (
                <TableRow key={index}>
                    <TableRowColumn><Link to={"/users/" + item[2]}>{item[1]}</Link></TableRowColumn>
                    <TableRowColumn>{item[2]}</TableRowColumn>
                    <TableRowColumn>{created}</TableRowColumn>
                    <TableRowColumn>{lastack}</TableRowColumn>
                </TableRow>
            );
        });

        return (
            <div>
                <div>
                    <Breadcrumbs
                        routes={this.props.routes}
                        params={this.props.params}
                    />
                </div>
                <h1>Users</h1>
                <Table>
                    <TableHeader
                      displaySelectAll={false}
                      adjustForCheckbox={false}
                      enableSelectAll={false}
                    >

                        <TableRow>
                            <TableHeaderColumn>Username</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn>Created</TableHeaderColumn>
                            <TableHeaderColumn>Last Access</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                      showRowHover
                      stripedRows
                      displayRowCheckbox={false}
                    >
                        {windowTitles}
                    </TableBody>
                </Table>
            </div>
        );
    }
});

export default Users;
