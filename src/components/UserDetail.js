/* eslint-disable no-unused-vars */
import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
var Breadcrumbs = require('react-breadcrumbs');
/* eslint-enable no-unused-vars */
import {ServerUrl} from '../../conf.json';
import $ from 'jquery';

var UserDetail = React.createClass({
  getInitialState() {
    return {
      user: {}
    };
  },

  loadDataFromServer() {
    this.serverRequest = $.ajax({
      url: ServerUrl + '/api/users/' + this.props.params.id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          user: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount() {
    this.loadDataFromServer();
  },

  render() {
    console.log(this.state.user);
    return (
            <div>
                <div>
                    <Breadcrumbs
                        routes={this.props.routes}
                        params={this.props.params}
                    />
                </div>
                <h1>User {this.state.user.username}</h1>
                <h3><a href="mailto:{this.state.user.email}">{this.state.user.email}</a></h3>
                <Table>
                    <TableBody
                      showRowHover
                      stripedRows
                      displayRowCheckbox={false}
                    >
                        <TableRow>
                            <TableRowColumn>ID</TableRowColumn>
                            <TableRowColumn>{this.state.user.id}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Active</TableRowColumn>
                            <TableRowColumn>{this.state.user.active ? 'True' : 'False'}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Deleted</TableRowColumn>
                            <TableRowColumn>{this.state.user.deleted ? 'True' : 'False'}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>External</TableRowColumn>
                            <TableRowColumn>{this.state.user.external ? 'True' : 'False'}</TableRowColumn>
                        </TableRow>

                        <TableRow>
                            <TableRowColumn>Disk Usage</TableRowColumn>
                            <TableRowColumn>{this.state.user.disk_usage}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
  }
});

export default UserDetail;
