export type FieldTypes = 'email' | 'username' | 'password' | 'all';
export interface IAccountFields {
  email: string;
  username: string;
  password: string;
}
export function validateAccountFields(fieldType: FieldTypes, values: IAccountFields, errors: IAccountFields) {
  const newErrors = errors;

  if (['email', 'all'].includes(fieldType)) {
    /*eslint no-control-regex: 0 */
    const rgx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

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
