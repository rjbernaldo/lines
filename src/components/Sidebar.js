import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import GParagraph from 'grommet/components/Paragraph';
import GHeading from 'grommet/components/Heading';

import CLineList from '../containers/CLineList';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      type: undefined,
      color: undefined,
    };
  }

  handleSelect(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { numberOfBends, totalLength, deletePoints, ids } = this.props;

    const style = { padding: '0px', margin: '0px', marginBottom: '5px', WebkitUserSelect: 'none' };
    return (
      <GBox style={{ width: '300px' }}>
        <GBox pad="medium">
          <GHeading tag="h3" style={{ WebkitUserSelect: 'none' }}>Details</GHeading>
          <GParagraph size="small" style={style}>Number of Bends: { numberOfBends }</GParagraph>
          <GParagraph size="small" style={style}>Total Length: { totalLength }</GParagraph>
          <GParagraph size="small" style={style}>
            Type:
            <select name="type" onChange={this.handleSelect}>
              <option>Type A</option>
              <option>Type B</option>
            </select>
          </GParagraph>
          <GParagraph size="small" style={style}>
            Color:
            <select name="color" onChange={this.handleSelect}>
              <option>Color A</option>
              <option>Color B</option>
            </select>
          </GParagraph>
        </GBox>
        <CLineList />
        <GBox pad="medium">
          <GParagraph
            size="small"
            style={Object.assign({}, style, { fontWeight: '400' })}
            onClick={() => { deletePoints(ids); }}
          >
            Clear Canvas
          </GParagraph>
        </GBox>
      </GBox>
    );
  }
}

export default Sidebar;

