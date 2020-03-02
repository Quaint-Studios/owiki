import { router } from '../user.route';
import { handleApiError } from '../../v1.utils';

// Firebase Imports
import admin = require('firebase-admin');
import { db } from '@proj/firebase.main';

import { IUserAuth, IUser, validateUsername } from '../user.utils';

router.post('/', async (req, res) => {
  try {
    const { username, email, password }: IUserAuth = req.body;

    if (!validateUsername(username)) {
      throw 'auth/invalid-username'; // Custom error
    }

    const bodyValidation = [username, email, password].every(elem => {
      return typeof elem === 'string';
    });

    if (!bodyValidation) {
      throw 'auth/invalid-typed-argument'; // Custom error
    }

    const uid = (await db.ref('uids').push()).key;

    if (uid === null) {
      throw 'auth/internal-db-error'; // Custom error
    }

    const claims: IUser = {
      username,
      email
    };

    const token = await admin.auth().createCustomToken(uid, claims);

    db.ref(uid).set({
      username,
      email
    });

    res.json({ token });
  } catch (error) {
    handleApiError(res, error);
  }
});
