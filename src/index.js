import 'grommet/scss/vanilla/index.scss';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './components/Root';
import routes from './routes';

const renderApp = (appRoutes) => {
  render(
    <AppContainer>
      <Root routes={appRoutes} />
    </AppContainer>,
    document.getElementById('app'),
  );
};

renderApp(routes);
document.body.classList.remove('loading');

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const newRoutes = require('./routes').default;
    render(newRoutes);
  });
}
