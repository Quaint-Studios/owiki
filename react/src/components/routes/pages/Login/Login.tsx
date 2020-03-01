import React, { useState } from 'react';

import './Login.scss';
import { providers } from 'components/firebase/firebase.auth';
import { validateAccountFields, FieldTypes } from 'components/utils/validations.utils';
import Container from 'components/interfaces/container/Container';
import Card, { ICard } from 'components/interfaces/card/Card';

export default function Login() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: ''
  });

  function handleLoginErrors(error: any) {
    if (error.code === 'auth/weak-password') {
    }
  }

  function handleLogin() {
    if (validateField('all')) {
      console.log('No errors.');
    } else {
      console.log('Agh! errors.');
    }

    const credentials = {
      username,
      email,
      password
    };

    providers.handleEmailProvider('login', credentials, handleLoginErrors);
  }

  

  function validateField(fieldType: FieldTypes) {
    const credentials = {
      username,
      email,
      password
    };

    const newErrors = validateAccountFields(fieldType, credentials, errors);

    if (newErrors !== errors) {
      setErrors({ ...newErrors });

      if (
        newErrors.email === '' &&
        newErrors.username === '' &&
        newErrors.password === ''
      ) {
        return true;
      }
      return false;
    }
  }

  const cardProps: ICard = {
    title: { value: 'Account' },
    description: { value: 'Login' },
    contents: [
      {
        value: (
          <div
            className={`input-group ${errors.email !== '' ? 'invalid' : ''}`}
          >
            <p className="input-name">Email address:</p>
            <input
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                validateField('email');
              }}
            />
          </div>
        )
      },
      {
        value: (
          <div
            className={`input-group ${errors.username !== '' ? 'invalid' : ''}`}
          >
            <p className="input-name">Username:</p>
            <input
              value={username}
              onChange={e => {
                setUsername(e.target.value);
                validateField('username');
              }}
            />
          </div>
        )
      },
      {
        value: (
          <div
            className={`input-group ${errors.password !== '' ? 'invalid' : ''}`}
          >
            <p className="input-name">Password:</p>
            <input
              type="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                validateField('password');
              }}
            />
          </div>
        )
      }
    ],
    actions: [
      {
        value: 'Login',
        button: { onClick: handleLogin }
      }
    ]
  };

  return (
    <Container className="center-h center-v">
      <Card className="login" {...cardProps} />
    </Container>
  );
}
