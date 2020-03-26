import React, { Component } from 'react';

class user extends Component {
  render() {
    return (
      <div>
        yonghu
        {this.props.children}
      </div>
    );
  }
}

export default user;