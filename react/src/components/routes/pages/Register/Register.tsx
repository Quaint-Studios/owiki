import React, { useState } from 'react';

import './Register.scss';
import { providers } from 'components/firebase/firebase.auth';
import {
  validateAccountFields,
  FieldTypes
} from 'components/utils/validations.utils';
import Card, { ICard } from 'components/interfaces/card/Card';
import Container from 'components/interfaces/container/Container';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: ''
  });

  function handleRegisterErrors(error: any) {
    if (error.code === 'auth/invalid-email') {
      setErrors({ ...errors, email: 'Invalid email.' });
    }

    if (error.code === 'auth/weak-password') {
      setErrors({ ...errors, password: 'Weak password.' });
    }
  }

  function handleRegister() {
    const credentials = {
      username,
      email,
      password
    };

    providers.handleEmailProvider(
      'register',
      credentials,
      handleRegisterErrors
    );
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
    description: { value: 'Create' },
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
        value: 'Register',
        button: { onClick: handleRegister }
      }
    ]
  };

  return (
    <Container className="center-h center-v">
      <Card className="register" {...cardProps} />
    </Container>
  );
}
