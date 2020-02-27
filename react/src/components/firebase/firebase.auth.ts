import { auth } from 'firebase/app';
import 'firebase/auth';
import { handleEmailProvider, handleGoogleProvider } from './firebase.providers';

export const providers = {
    handleEmailProvider,
    handleGoogleProvider
};

export const logout = () =>
  auth()
    .signOut()
    .then(() => {
      console.log('Google User signed out successfully.');
    })
    .catch(err => {
      console.error('Google User Signout Error:' + err);
    });
