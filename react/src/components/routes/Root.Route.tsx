import { IRoute } from './Routes';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Error404 from './pages/Error404/Error404';

const RootRoutes: IRoute[] = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Register',
    path: '/register',
    component: Register
  },
  {
    name: 'Error 404',
    component: Error404
  }
];

export default RootRoutes;
