import React from 'react';

import './Home.scss';

import { useUserInfoValue } from 'components/contexts/data/UserInfo';
import { db } from 'components/firebase/firebase.main';

import { Link } from 'react-router-dom';

export default function Home() {
  const [userInfo] = useUserInfoValue();

  let response;
  const { user } = userInfo;
  const { profile } = userInfo;

  if (user !== null && profile !== null) {
    response = <div>{`Hello, ${profile.username}!`}</div>;
  } else {
    if (user === null) {
      response = (
        <div>
          {'Feel free to'}
          <Link to="/register">{'sign up'}</Link>
          {' or '}
          <Link to="/login">{'login'}</Link>
          {'.'}
        </div>
      );
    }
  }

  return (
    <>
      <div>{'owiki!'}</div>
      {response}
    </>
  );
}
