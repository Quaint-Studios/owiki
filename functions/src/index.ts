import './aliases';

import './firebase.main';
import { webApi } from '@express/express.main';

/*
This can be used later:

import functions from './functions/functions.main';

functions.forEach((func, name) => {
  exports[name] = func;
});
*/

exports['webApi'] = webApi; // Express API
