import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import GApp from 'grommet/components/App';
import GBox from 'grommet/components/Box';
import GSplit from 'grommet/components/Split';

import CHome from '../containers/CHome';
import CSidebar from '../containers/CSidebar';

const App = () => (
  <GApp centered={false}>
    <GSplit flex="left">
      <GBox>
        <Switch>
          <Route exact path="/" component={CHome} />
        </Switch>
      </GBox>
      <GBox colorIndex="light-2" full="vertical">
        <CSidebar />
      </GBox>
    </GSplit>
  </GApp>
);

export default App;
