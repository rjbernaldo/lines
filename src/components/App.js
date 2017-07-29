import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import GApp from 'grommet/components/App';
import GBox from 'grommet/components/Box';
import GSplit from 'grommet/components/Split';

import Home from './Home';
import Sidebar from './Sidebar';

const App = () => (
  <GApp centered={false}>
    <GSplit flex="left">
      <GBox pad="small">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </GBox>
      <GBox colorIndex="light-2" full="vertical">
        <Sidebar />
      </GBox>
    </GSplit>
  </GApp>
);

export default App;