import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import GButton from 'grommet/components/Button';
import GMenu from 'grommet/components/Menu';
import GAnchor from 'grommet/components/Anchor';
import GHeading from 'grommet/components/Heading';

import CLineList from '../containers/CLineList';

const Sidebar = () => (
  <GBox>
    <GBox pad="medium" style={{ paddingBottom: '0px' }}>
      <GButton
        onClick={onClick}
        label="Add Point"
      />
    </GBox>
    <GBox pad="medium" style={{ paddingBottom: '0px' }}>
      <CLineList />
    </GBox>
  </GBox>
);

export default Sidebar;

function onClick() {
  console.log('test');
}
