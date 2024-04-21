// Firebase and Express imports
import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';

// API initialization
import config from './api/api.config';
import api from './api/api.main';

// Utilities
import { debug } from '../utils/essentials.utils';

const main = express(); // The glue that puts it all together!

// Latest API Version
main.get('/api/v', (req: any, res: any) => {
  res.json({ api: config.root });
});

// Set the rules and location for the root entrypoint
main.use(config.root, api);
main.use(bodyParser.json());

// eslint-disable-next-line import/prefer-default-export
export const webApi = functions.https.onRequest(main);

debug('Makosai!!', true);
