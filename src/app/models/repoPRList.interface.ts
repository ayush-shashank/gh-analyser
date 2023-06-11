export interface IRepoPRList {
  pullRequests: {
    totalCount: number;
    nodes: [
      {
        author: {
          login: string;
        };
      }
    ];
  };
}

export const PRListQuery = `
  query ($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      pullRequests(first: 100) {
        totalCount
        nodes {
          author {
            ... on User {
              login
            }
          }
        }
      }
    }
  }
`;
