export interface IUser {
  name: string;
  login: string;
  avatarUrl: string;
}

export const UserQuery = `
query {
  currentUser: viewer {
    name
    login
    avatarUrl
  }
}
`;
