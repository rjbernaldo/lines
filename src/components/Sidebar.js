import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import GMenu from 'grommet/components/Menu';
import GAnchor from 'grommet/components/Anchor';
import GHeading from 'grommet/components/Heading';

import CLineList from '../containers/CLineList';

const Sidebar = () => (
  <GBox>
    <GMenu inline={true} direction="column" primary={true} size="large">
      <GBox pad="medium" style={{ paddingBottom: '0px' }}>
        <GHeading tag="h4">
          Hello World!
        </GHeading>
      </GBox>
      <GAnchor label="Sample Link" path="/sample-link" />
      <CLineList />
    </GMenu>
  </GBox>
);

export default Sidebar;
