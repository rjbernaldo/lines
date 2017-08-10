import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import GButton from 'grommet/components/Button';
import GMenu from 'grommet/components/Menu';
import GAnchor from 'grommet/components/Anchor';
import GHeading from 'grommet/components/Heading';

import CLineList from '../containers/CLineList';

const Sidebar = ({ mode, toggleMode }) => {
  const label = mode === 'SELECT'
    ? 'Add Point'
    : 'Done';

  const handleClick = () => {
    toggleMode(mode);
  };

  return (
    <GBox style={{ width: '300px' }}>
      <GBox pad="medium" style={{ paddingBottom: '0px' }}>
        <GButton
          primary={true}
          onClick={handleClick}
          label={label}
        />
      </GBox>
      <CLineList />
    </GBox>
  );
};

export default Sidebar;
