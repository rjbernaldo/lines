import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import CDrawing from '../containers/CDrawing';

const Home = () => (
  <GBox flex="grow">
    <GBox style={{ paddingTop: '0px', paddingBottom: '0px' }}>
      <CDrawing />
    </GBox>
  </GBox>
);

export default Home;
