import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import GParagraph from 'grommet/components/Paragraph';
import GHeading from 'grommet/components/Heading';

import CLineList from '../containers/CLineList';

const Sidebar = ({ mode, toggleMode }) => {
  const style = { 
    padding: '0px', margin: '0px', marginBottom: '5px', WebkitUserSelect: 'none',
  };
  return (
    <GBox style={{ width: '300px' }}>
      <GBox pad="medium">
        <GHeading tag="h3" style={{ WebkitUserSelect: 'none' }}>Instructions</GHeading>
        <GParagraph size="small" style={style}>Click Canvas/Anchor: Add anchor</GParagraph>
        <GParagraph size="small" style={style}>Double Click Anchor: End drawing</GParagraph>
        <GParagraph size="small" style={style}>Click & Drag Anchor: Move anchor</GParagraph>
        <GParagraph size="small" style={style}>Right Click Anchor: Delete anchor</GParagraph>
        <GParagraph size="small" style={style}>Right Click Length: Edit length</GParagraph>
        <GParagraph size="small" style={style}>Click & Drag Line: Move line</GParagraph>
        <GParagraph size="small" style={style}>Right Click Line: Delete line</GParagraph>
        <GParagraph size="small" style={style}>Right Click Angle: Edit angle</GParagraph>
      </GBox>
      <CLineList />
    </GBox>
  );
};

export default Sidebar;
