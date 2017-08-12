import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import GButton from 'grommet/components/Button';
import GMenu from 'grommet/components/Menu';
import GAnchor from 'grommet/components/Anchor';
import GHeading from 'grommet/components/Heading';

import CLineList from '../containers/CLineList';

const Sidebar = ({ mode, toggleMode }) => {
  return (
    <GBox style={{ width: '300px' }}>
      <CLineList />
    </GBox>
  );
};

export default Sidebar;
