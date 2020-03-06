import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { auth } from 'firebase/app';
import { providers, logout } from 'components/firebase/firebase.auth';
import { IEmailCredentials } from 'components/firebase/firebase.providers';
import { rdb } from 'components/firebase/firebase.database';

//#region Interfaces & Enums
/**
 * The structure for profiles.
 */
interface IProfile {
  username: string;
}

/**
 * The structure of the state.
 */
interface IState {
  user: firebase.User | null;
  profile: IProfile | null;
  error?: firebase.auth.Error;
  loading: boolean;
}

/**
 * The structure of the JSX props.
 */
interface IProps {
  children: any;
}

/**
 * What the dispatch is allowed to do.
 */
export enum ActionType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  UPDATE = 'update'
}

/**
 * Data that the dispatch may receive.
 */
interface IPayload {
  user?: firebase.User | null;
  profile?: IProfile | null;
  credentials?: IEmailCredentials;
  error?: firebase.auth.Error;
  loading?: boolean;
}

interface IAction {
  type: ActionType;
  payload?: IPayload;
}

/**
 * The structure for the ContextProvider.
 */
interface IProvider {
  reducer: [IState, React.Dispatch<IAction>];
  children: any;
}
//#endregion

//#region Context

/** This is the context */
export const Context = createContext<[IState, React.Dispatch<IAction>]>(
  // tslint:disable-next-line: no-object-literal-type-assertion
  {} as [IState, React.Dispatch<IAction>]
);

const Provider = ({ reducer, children }: IProvider) => (
  <Context.Provider value={reducer}>{children}</Context.Provider>
);

/** This is what you use to get the value */
export const useUserInfoValue = () => useContext(Context);
//#endregion

//#region JSX
const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      if (state.user !== null) {
        console.error('Google Auth Error: User already logged in.');
        return { ...state };
      }

      // TODO: Temporarily the only auth support for a while.
      if (
        action.payload === undefined ||
        action.payload.credentials === undefined
      ) {
        console.error('Google Auth Error: Missing payload for LOGIN.');
        return { ...state };
      }

      providers.handleEmailProvider('login', action.payload.credentials);

      return { ...state, loading: true };

    case ActionType.LOGOUT:
      logout();

      return { ...state, loading: true };

    case ActionType.UPDATE:
      if (action.payload === undefined) {
        console.error('UserInfo Reducer Error: Missing payload in UPDATE.');
        return { ...state };
      }

      // Sanitize.
      delete action.payload.credentials;

      return { ...state, ...action.payload };

    default:
      console.error('Invalid UserInfo reducer used.');
      return { ...state };
  }
};

/**
 * Context JSX
 */
export function UserInfo({ children }: IProps) {
  const initialState: IState = {
    user: null,
    profile: null,
    error: undefined,
    loading: true
  };

  /** The reducer that can be used both locally and globally through the provider. */
  const constReducer = useReducer(reducer, initialState);

  const [, setUserInfo] = constReducer;

  /** Only runs once, on mount. */
  useEffect(() => {
    /** When the firebase auth changes, set the user data (error, or new user), then set loading to false. */
    const unsubscribeAuthStateListener = auth().onAuthStateChanged(
      async newUser => {
        let profile: IProfile | null = null;

        if (newUser) {
          await rdb.ref(`users/${newUser.uid}`)
            .once('value')
            .then(snapshot => {
              profile = snapshot.val();
            })
            .catch(error => console.log(error));
        }

        setUserInfo({
          type: ActionType.UPDATE,
          payload: { user: newUser, profile, loading: false }
        });
      },
      (error: firebase.auth.Error) =>
        setUserInfo({
          type: ActionType.UPDATE,
          payload: { error, loading: false }
        })
    );

    return () => {
      // Clean up by unsubscribing on unmout
      unsubscribeAuthStateListener();
    };
  }, [setUserInfo]);

  return <Provider reducer={constReducer}>{children}</Provider>;
}
//#endregion
