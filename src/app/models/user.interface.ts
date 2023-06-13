export interface User {
  name?: string;
  login: string;
  avatarUrl?: string;
  url?: string;
}

export const UserQuery = `
query {
  currentUser: viewer {
    name
    login
    avatarUrl
    url
  }
}
`;
