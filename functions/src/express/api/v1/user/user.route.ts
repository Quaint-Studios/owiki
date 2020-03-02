import * as express from 'express';

import api from '../../api.main';
import { endpoints } from '../v1.main'; // API endpoint

export const router = express.Router();
api.use(endpoints.user, router);
