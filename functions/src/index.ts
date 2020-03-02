import './aliases';

import './firebase.main';
import { webApi } from '@express/express.main';

/* import functions from './functions/functions.main';

functions.forEach((func, name) => {
  exports[name] = func;
});
*/

exports['webApi'] = webApi; // Express API
