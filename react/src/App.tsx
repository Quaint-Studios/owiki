import React from 'react';

import './App.scss';

import Routes from 'components/routes/Routes';
import RootRoutes from 'components/routes/Root.Route';

export default function App() {
  return <Routes routes={RootRoutes} />;
}
