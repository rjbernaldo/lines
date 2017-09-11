import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import GParagraph from 'grommet/components/Paragraph';
import GHeading from 'grommet/components/Heading';

import CLineList from '../containers/CLineList';

const Sidebar = ({ mode, toggleMode, numberOfBends, totalLength }) => {
  const style = { padding: '0px', margin: '0px', marginBottom: '5px', WebkitUserSelect: 'none' };
  return (
    <GBox style={{ width: '300px' }}>
      <GBox pad="medium">
        <GHeading tag="h3" style={{ WebkitUserSelect: 'none' }}>Details</GHeading>
        <GParagraph size="small" style={style}># of Bends: { numberOfBends }</GParagraph>
        <GParagraph size="small" style={style}>Total Length: { totalLength }</GParagraph>
      </GBox>
      <CLineList />
    </GBox>
  );
};

export default Sidebar;
