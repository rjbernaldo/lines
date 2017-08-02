import React, { Component } from 'react';

import Anchor from './DrawingElements/Anchor.js'

class Drawing extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown(this);
    this.handleMouseUp = this.handleMouseUp(this);
    this.handleMouseMove = this.handleMouseMove(this);
    this.handleDrag = this.handleDrag(this);

    this.state = {
      points: {
        a: { name: 'A', x: 100, y: 350, prev: null, next: 'b' },
        b: { name: 'B', x: 250, y: 50, prev: 'a', next: 'c' },
        c: { name: 'C', x: 400, y: 350, prev: 'b', next: null },
      },
    };
  }

  componentDidMount() {
  }

  handleMouseDown() {
  }

  handleMouseUp() {
  }

  handleMouseMove() {
  }

  handleDrag() {
  }

  render() {
    return (
      <svg height="400" width="450">
        {/* { 
           this.state.points.map((p, i) => {
            const next = this.state.points[i + 1];

            if (!next) return null;

            return <path d={`M${p.x} ${p.y} L${next.x} ${next.y}`} stroke="red" strokeWidth="3" fill="none" />;
          }) 
        } */}

        <g stroke="black" strokeWidth="3" fill="black">
          { 
            Object
              .keys(this.state.points)
              .map((k) => {
                const points = this.state.points;
                const { x, y } = points[k];

                return (
                  <Anchor x={x} y={y} />
                );
              })
          }
        </g>

        {/* <g fontSize="30" fill="black" stroke="none" textAnchor="middle">
          { this.state.points.map(p => <text x={p.x} y={p.y} dx="-15">{p.name}</text>) }
        </g> */}
      </svg>
    );
  }
}

export default Drawing;
