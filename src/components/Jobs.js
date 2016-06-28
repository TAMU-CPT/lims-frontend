/* eslint-disable no-unused-vars */
import React from 'react';
import {ServerUrl} from '../../conf.json';
/* eslint-enable no-unused-vars */
import $ from 'jquery';

var Jobs = React.createClass({
  getInitialState() {
    return {
      contents: null
    };
  },

  dataChanged(newValue) {
    $.ajax({
      type: 'POST',
      url: ServerUrl + '/api/jobs',
      dataType: 'json',
      data: JSON.stringify({
        message: newValue.message,
        date: this.props.date
      }),

      success: function(data) {
        this.setState({
          contents: data.message
        });
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }
    });
  },

  render() {
    return (
            <div>
                <h1>Jobs</h1>
            </div>
        );
  }
});

export default Jobs;
