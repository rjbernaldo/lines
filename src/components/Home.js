import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import Drawing from './Drawing';

const Home = () => (
  <GBox flex="grow">
    <GBox pad="medium" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
      <Drawing />
    </GBox>
  </GBox>
);

export default Home;
