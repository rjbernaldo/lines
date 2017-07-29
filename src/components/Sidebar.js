import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import GImage from 'grommet/components/Image';
import GMenu from 'grommet/components/Menu';
import GAnchor from 'grommet/components/Anchor';
import GHeading from 'grommet/components/Heading';

import SearchIcon from 'grommet/components/icons/base/Search';
import UserIcon from 'grommet/components/icons/base/User';

const Sidebar = () => (
  <GBox>
    <GMenu inline={true} direction="column" primary={true} size="small">
      <GBox pad="medium" style={{ paddingBottom: '0px' }}>
        <GHeading tag="h4">
          Hello World!
        </GHeading>
      </GBox>
      <GAnchor label="Sample Link" path="/sample-link" />
    </GMenu>
  </GBox>
);

export default Sidebar;
