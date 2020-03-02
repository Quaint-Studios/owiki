// Firebase imports
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Utilities
import { debug } from '@utils/essentials.utils';

admin.initializeApp(functions.config().firebase); // Firebase Admin
export const db = admin.database(); // Realtime Database

debug(`"It's alive!"`, true);
