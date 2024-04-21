export function validateUsername(username: string) {
  const rgx = /^(([a-zA-Z])\w{2,14})$/;

  return rgx.test(username);
}

export type UserRole = ['sys' | 'admin' | 'mod' | 'jmod'];

export interface IUserAuth {
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  username: string;
  email: string;
  role?: UserRole;
}
