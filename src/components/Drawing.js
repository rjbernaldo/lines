import React, { Component } from 'react';
import * as d3 from 'd3';

class Drawing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawing: null,
    };
  }

  componentDidMount() {
    this.setState({
      drawing: document.getElementById('drawing');
    });
  }

  render() {
    return (
      <div id="drawing"></div>
    )
  }
}

export default Drawing;