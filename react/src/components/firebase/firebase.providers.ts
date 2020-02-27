import { auth } from 'firebase/app';
import 'firebase/auth';

type AuthOptions = 'register' | 'login';

export interface IEmailCredentials {
  email: string;
  username: string;
  password: string;
}

/**
 * Email Provider
 * @param authOption
 * @param credentials
 */
export function handleEmailProvider(
  authOption: AuthOptions,
  credentials: IEmailCredentials,
  errorCallback?: Function
) {
  const { email, password } = credentials;

  switch (authOption) {
    case 'register':
      return auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
            console.log('The password is too weak.');
          } else {
            console.log(errorMessage);
          }

          console.error(error);

          if (errorCallback) errorCallback(error);
        });

    case 'login':
    default:
      return auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.error(error);
        });
  }
}

export interface ILoginResponse {
  token: string;
  user: firebase.User;
}

/**
 * Google Provider
 */
export async function handleGoogleProvider() {
  const provider = new auth.GoogleAuthProvider();

  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

  auth().useDeviceLanguage();

  provider.setCustomParameters({
    login_hint: 'user@example.com'
  });

  const credentials = await auth().signInWithPopup(provider);

  const user = credentials.user;

  if (user !== null) {
    const token = await user.getIdToken();

    return { token, user };
  } else {
    throw new Error('Google User Auth Error: Firebase User is null.');
  }
}
