import React, { Component } from 'react';
import update from 'react-addons-update';

import Anchor from './DrawingElements/Anchor';

class Drawing extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.state = {
      points: {
        0: { name: 'A', x: 100, y: 350, prev: null, next: 1 },
        1: { name: 'B', x: 250, y: 50, prev: 0, next: 2 },
        2: { name: 'C', x: 400, y: 350, prev: 1, next: null },
      },
    };
  }

  handleMouseMove(p) {
    return (x, y) => {
      const points = this.state.points;

      let k;
      Object
        .keys(points)
        .forEach((key) => {
          if (points[key] === p) {
            k = key;
          }
        });

      this.setState({
        points: update(this.state.points, {
          [k]: {
            x: { $set: x },
            y: { $set: y },
          },
        }),
      });
    };
  }

  render() {
    return (
      <svg height="400" width="450">
        {
          Object
            .keys(this.state.points)
            .map((k) => {
              const points = this.state.points;
              const c = points[k];

              if (c.next) {
                const n = points[c.next];

                return (
                  <path d={`M${c.x} ${c.y} L${n.x} ${n.y}`} stroke="red" strokeWidth="3" fill="none" />
                );
              }

              return null;
            })
        }

        <g stroke="black" strokeWidth="3" fill="black">
          { 
            Object
              .keys(this.state.points)
              .map((k) => {
                const points = this.state.points;
                const { x, y, prev, next } = points[k];

                return (
                  <Anchor
                    handleMouseMove={this.handleMouseMove(points[k])}
                    x={x}
                    y={y}
                    prev={this.state.points[prev]}
                    next={this.state.points[next]}
                  />
                );
              })
          }
        </g>

         {/* <g fontSize="30" fill="black" stroke="none" textAnchor="middle">
          { this.state.points.map(p => <text x={p.x} y={p.y} dx="-15">{p.name}</text>) }
        </g>  */}
      </svg>
    );
  }
}

export default Drawing;