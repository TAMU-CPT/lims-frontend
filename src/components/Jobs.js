import React from 'react';
import InlineEdit from 'react-edit-inline';
import { ServerUrl, ApiKey } from '../../conf.json';
import $ from 'jquery';

var Jobs = React.createClass({
    getInitialState: function(){
        return {
            contents: null,
        }
    },

    dataChanged: function(newValue) {
        $.ajax({
            type: "POST",
            url: ServerUrl + "/api/blog",
            dataType: 'json',
            headers: {
                "Authorization": ApiKey,
            },
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify({
                message: newValue.message,
                date: this.props.date,
            }),
            success: function(data){
                this.setState({contents: data.message});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(xhr, status, err.toString());
            }.bind(this)
        });
    },

    render: function () {
        return (
            <div>
                <h1>Jobs</h1>
            </div>
        )
    }
});

export default Jobs;
