/* eslint-disable no-unused-vars */
import React from 'react';
import {Link} from 'react-router';
var Breadcrumbs = require('react-breadcrumbs');
import {Table, Column, Cell} from 'fixed-data-table';
import Avatr from 'react-avatr';
/* eslint-enable no-unused-vars */
import {ServerUrl} from '../../conf.json';
/* global fetch */
import 'whatwg-fetch';
import moment from 'moment';

const DateCell = ({rowIndex, data, col}) => (
  <Cell>
    {data.getObjectAt(rowIndex)[col].toLocaleString()}
  </Cell>
);

const ImageCell = ({rowIndex, data, col}) => (
  <Cell>
    {data[rowIndex][col]}
  </Cell>
);

const TextCell = ({rowIndex, data, col}) => (
  <Cell>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);



var Users = React.createClass({
    getInitialState() {
        return {
            users: [],
            filteredUsers: [],
        };
    },

    onFilterChange(e){
        if(!e.target.value || e.target.value.length == 0){
            this.setState({
                users: this.state.users,
                filteredUsers: this.state.users,
            })
        }


        var filterBy = e.target.value.toLowerCase();
        var newFilteredUsers = this.state.users.filter(function(value, index){
            return value[1].toLowerCase().indexOf(filterBy) !== -1;
        })

        this.setState({
            users: this.state.users,
            filteredUsers: newFilteredUsers,
        })
    },

    loadDataFromServer() {
        fetch(ServerUrl + '/api/users')
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                this.setState({
                    users: json,
                    filteredUsers: json,
                });
            }.bind(this)).catch(function(ex) {
                console.log('parsing failed', ex);
            });
    },

    componentDidMount() {
        this.loadDataFromServer();
    },

    render() {
        return (
            <div>
                <div>
                    <Breadcrumbs
                        routes={this.props.routes}
                        params={this.props.params}
                    />
                </div>
                <h1>Users</h1>
                <input onChange={this.onFilterChange} placeholder="Filter by name" />

                <Table
                    rowHeight={50}
                    rowsCount={this.state.filteredUsers.length}
                    width={1200}
                    height={400}
                    headerHeight={50}>
                <Column
                    cell={({rowIndex}) => (
                        <Avatr
                            size={50}
                            round={false}
                            email={this.state.filteredUsers[rowIndex][2]}
                            />
                    )}
                    width={50}
                    />

                <Column
                    header={<Cell>ID</Cell>}
                    cell={({rowIndex}) => (
                        <Cell>
                            <Link to={"/users/" + this.state.filteredUsers[rowIndex][2]}>
                            {this.state.filteredUsers[rowIndex][1]}
                            </Link>
                        </Cell>
                    )}
                    width={250}
                    />
                <Column
                    header={<Cell>Email</Cell>}
                    cell={({rowIndex}) => (
                        <Cell>
                            {this.state.filteredUsers[rowIndex][2]}
                        </Cell>
                    )}
                    width={450}
                    />
                <Column
                    header={<Cell>Created</Cell>}
                    cell={({rowIndex}) => (
                        <Cell>
                            {moment.unix(this.state.filteredUsers[rowIndex][0]).format()}
                        </Cell>
                    )}
                    width={250}
                    />
                <Column
                    header={<Cell>Last Login</Cell>}
                    cell={({rowIndex}) => (
                        <Cell>
                            {moment.unix(this.state.filteredUsers[rowIndex][3]).format()}
                        </Cell>
                    )}
                    width={250}
                    />
                </Table>
            </div>
        );
    }
});

export default Users;
