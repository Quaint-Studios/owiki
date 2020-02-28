import React, { useState } from 'react';

import './Register.scss';
import { providers } from 'components/firebase/firebase.auth';

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

  type FieldTypes = 'email' | 'username' | 'password' | 'all';

  function validateField(fieldType: FieldTypes) {
    const prevErrors = errors;

    switch (fieldType) {
      case 'email':
        /*eslint no-control-regex: 0 */
        const rgx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        if (!rgx.test(email)) {
          prevErrors.email = 'Invalid email.';
          break;
        }
        prevErrors.email = '';
        break;

      case 'username':
        if (username.length < 3) {
          prevErrors.username = 'Username too short.';
          break;
        }
        prevErrors.username = '';
        break;

      case 'password':
        if (password.length < 8) {
          prevErrors.password = 'Password too short.';
          break;
        }
        prevErrors.password = '';
        break;
    }

    if (prevErrors !== errors) {
      setErrors({ ...prevErrors });

      if (
        prevErrors.email === '' &&
        prevErrors.username === '' &&
        prevErrors.password === ''
      ) {
        return true;
      }
      return false;
    }
  }

  return (
    <div className="register">
      <div>Register</div>
      <div className={errors.email !== '' ? 'invalid' : ''}>
        <p>Email address:</p>
        <input
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
      <button type="submit" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}
