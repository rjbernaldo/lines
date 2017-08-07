import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import ConnectedDrawing from '../containers/ConnectedDrawing';

const Home = () => (
  <GBox flex="grow">
    <GBox style={{ paddingTop: '0px', paddingBottom: '0px' }}>
      <ConnectedDrawing />
    </GBox>
  </GBox>
);

export default Home;
