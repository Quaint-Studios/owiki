import React, { useState } from 'react';

import './Login.scss';
import { providers } from 'components/firebase/firebase.auth';
import { validateAccountFields, FieldTypes } from 'components/utils/validations.utils';

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

  return (
    <div className="login">
      <div>Login</div>
      <div className={errors.email !== '' ? 'invalid' : ''}>
        <p>Email address:</p>
        <input
          type="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            validateField('email');
          }}
        />
      </div>
      <div className={errors.username !== '' ? 'invalid' : ''}>
        <p>Username:</p>
        <input
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            validateField('username');
          }}
        />
      </div>
      <div className={errors.password !== '' ? 'invalid' : ''}>
        <p>Password:</p>
        <input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            validateField('password');
          }}
        />
      </div>
      <button type="submit" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
