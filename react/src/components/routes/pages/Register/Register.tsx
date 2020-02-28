import React, { useState } from 'react';

import './Register.scss';
import { providers } from 'components/firebase/firebase.auth';
import { validateAccountFields, FieldTypes } from 'components/utils/validations.utils';

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
