import { User } from './user.interface';

export interface IRepoPRList {
  repository: {
    pullRequests: {
      pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
      };
      nodes: [
        {
          createdAt: string;
          author: User;
        }
      ];
    };
  };
}

export const PRListQuery = `
query ($owner: String!, $repo: String!, $cursor: String) {
  repository(owner: $owner, name: $repo) {
    pullRequests(
      first: 100
      after: $cursor
      orderBy: {field: CREATED_AT, direction: DESC}
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        createdAt
        author {
          login
          avatarUrl
          ... on User {
            name
          }
        }
      }
    }
  }
}
`;
