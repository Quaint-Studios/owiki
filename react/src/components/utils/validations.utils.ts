export type FieldTypes = 'email' | 'username' | 'password' | 'all';
export interface IAccountFields {
  email: string;
  username: string;
  password: string;
}
export function validateAccountFields(fieldType: FieldTypes, values: IAccountFields, errors: IAccountFields) {
  const newErrors = errors;

  if (['email', 'all'].includes(fieldType)) {
    const rgx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!rgx.test(values.email)) {
      newErrors.email = 'Invalid email.';
    } else {
      newErrors.email = '';
    }
  }

  if (['username', 'all'].includes(fieldType)) {
    if (values.username.length < 3) {
      newErrors.username = 'Username too short.';
    } else {
      newErrors.username = '';
    }
  }

  if (['password', 'all'].includes(fieldType)) {
    if (values.password.length < 8) {
      newErrors.password = 'Password too short.';
    } else {
      newErrors.password = '';
    }
  }

  return newErrors;
}
