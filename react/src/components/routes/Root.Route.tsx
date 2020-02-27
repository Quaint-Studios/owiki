import { IRoute } from './Routes';

import Home from './pages/Home/Home';
import Error404 from './pages/Error404/Error404';

const RootRoutes: IRoute[] = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Error 404',
    component: Error404
  }
];

export default RootRoutes;
