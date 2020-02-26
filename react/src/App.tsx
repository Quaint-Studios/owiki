import React from 'react';

import './App.scss';

import { Switch } from 'react-router-dom';
import Routes from 'components/routes/Routes';
import RootRoutes from 'components/routes/Root.Route';

export default function App() {
  return (
    <Switch>
      <Routes routes={RootRoutes} />
    </Switch>
  );
}
