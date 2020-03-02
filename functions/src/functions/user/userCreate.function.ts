/*
import * as functions from 'firebase-functions';
import { db } from '@express/express.main';
import { handleFunctionError } from '../functions.utils';

export const userCreate = functions.auth.user().onCreate(async user => {
  try {
    const userInfo: IUsersSchema = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified
    };

    await db
      .collection('users')
      .doc(user.uid)
      .set(userInfo);
  } catch (error) {
    handleFunctionError(error);
  }
});
*/
