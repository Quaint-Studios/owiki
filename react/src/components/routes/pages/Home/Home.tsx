import React, { useEffect, useState } from 'react';

import './Home.scss';

import Logo from 'data/imgs/logo.svg';

import { useUserInfoValue } from 'components/contexts/data/UserInfo';

import { Link } from 'react-router-dom';
import { logout } from 'components/firebase/firebase.auth';
import Card, { ICard } from 'components/interfaces/card/Card';

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
        const cardProps: ICard = {
          title: { value: profile.username },
          description: { value: 'Profile Card' },
          actions: [
            {
              value: 'Logout',
              button: { onClick: logout }
            }
          ]
        };

        setResponse({
          state: 'logged-in',
          message: <Card {...cardProps} />
        });
      } else if (response.state !== 'logged-out' && user === null) {
        const cardProps: ICard = {
          title: { value: 'owiki', pos: 'bottom' },
          description: { value: 'Welcome to' },
          actions: [
            {
              value: 'Login',
              link: { to: '/login' }
            },
            {
              value: 'Register',
              link: { to: '/register' }
            }
          ]
        };

        setResponse({
          state: 'logged-out',
          message: <Card {...cardProps} />
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
