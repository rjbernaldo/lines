import React, { Component } from 'react';
import update from 'react-addons-update';

import Anchor from './DrawingElements/Anchor';

class Drawing extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.state = {
      points: {
        0: { x: 100, y: 350, prev: null, next: 1 },
        1: { x: 250, y: 50, prev: 0, next: 2 },
        2: { x: 400, y: 350, prev: 1 },
      },
    };
  }

  handleMouseDown(e) {
    if (e.target.tagName === 'svg') {
      const target = e.target;
      const dim = target.getBoundingClientRect();
      const x = e.clientX - dim.left;
      const y = e.clientY - dim.top;

      const nextKey = Object.keys(this.state.points).length;
      const prev = nextKey - 1;
      const current = this.state.points;

      current[nextKey] = {
        x,
        y,
        prev,
        next: null,
      };

      this.setState({ points: current }, () => {
        this.setState({
          points: update(this.state.points, {
            [prev]: {
              next: { $set: nextKey },
            },
          }),
        });
      });
    }
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
      <svg
        height="400"
        width="450"
        onMouseDown={this.handleMouseDown}
      >
        {
          Object
            .keys(this.state.points)
            .map((k) => {
              const points = this.state.points;
              const c = points[k];

              if (c.next) {
                const n = points[c.next];

                return (
                  <path d={`M${c.x} ${c.y} L${n.x} ${n.y}`} stroke="black" strokeWidth="3" fill="none" />
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
                    degrees={
                      calculateDegrees(
                        this.state.points[prev],
                        { x, y },
                        this.state.points[next],
                      )
                    }
                  />
                );
              })
          }
        </g>
      </svg>
    );
  }
}

export default Drawing;

function calculateDegrees(A, B, C) {
  if (A && B && C) {
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    const angle = Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));

    return Math.floor(angle * 180 / Math.PI);
  }

  return null;
}
