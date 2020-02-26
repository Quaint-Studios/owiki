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
  credentials: IEmailCredentials
) {
  const { email, password } = credentials;

  switch (authOption) {
    case 'register':
      auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
      break;

    case 'login':
      auth()
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
          console.log(error);
        });
      break;

    default:
      break;
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
