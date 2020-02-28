import React, { useEffect, useState } from 'react';

import './Home.scss';

import Logo from 'data/imgs/logo.svg';

import { useUserInfoValue } from 'components/contexts/data/UserInfo';

import { Link } from 'react-router-dom';
import { logout } from 'components/firebase/firebase.auth';

export default function Home() {
  const [userInfo] = useUserInfoValue();

  const { user } = userInfo;
  const { profile } = userInfo;

  type LoginState = 'logged-in' | 'logged-out' | 'reset';

  const [response, setResponse] = useState({
    state: 'reset',
    message: <></>
  });

  useEffect(() => {
    function updateResponse() {
      if (response.state !== 'logged-in' && user !== null && profile !== null) {
        setResponse({
          state: 'logged-in',
          message: (
            <>
              <div className="info">
                <span className="header">
                  <img className="logo" src={Logo} />
                  <span className="response">
                    <span className="username">{profile.username}</span>
                    <span>Profile Card</span>
                  </span>
                </span>
              </div>
              <div className="actions">
                <span className="button" onClick={logout}>
                  Logout
                </span>
              </div>
            </>
          )
        });
      } else if (response.state !== 'logged-out' && user === null) {
        setResponse({
          state: 'logged-out',
          message: (
            <>
              <div className="info">
                <span className="header">
                  <img className="logo" src={Logo} />
                  <span className="response">
                    <span>Welcome to</span>
                    <span className="sitename">owiki</span>
                  </span>
                </span>
              </div>
              <div className="actions">
                <Link className="button" to="/register">
                  Register
                </Link>
                <Link className="button" to="/login">
                  Login
                </Link>
              </div>
            </>
          )
        });
      }
    }
    updateResponse();
  }, [response, user, profile]);

  return (
    <div className="container center-v center-h">
      <div className="profile-card">{response.message}</div>
    </div>
  );
}
