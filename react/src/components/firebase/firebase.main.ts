import firebase from 'firebase/app';
import config from './firebase.config.json';

const app = firebase.initializeApp(config);

/**
 * Realtime Database
 */
export const db = app.database();
