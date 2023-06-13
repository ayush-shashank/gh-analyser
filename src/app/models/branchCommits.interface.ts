export interface IBRanchCommits {
  repository: {
    branch: {
      target: {
        history: {
          pageInfo: {
            endCursor: string;
            hasNextPage: boolean;
          };
          nodes: ICommit[];
        };
      };
    };
  };
}

export interface ICommit {
  authoredDate: string;
  author: {
    name: string;
    avatarUrl: string;
    user?: { login: string; url: string };
  };
}

export const BranchCommitsQuery = `
query ($owner: String!, $repo: String!, $startDate: GitTimestamp!, $endDate: GitTimestamp!, $cursor: String, $branchName: String!) {
  repository(owner: $owner, name: $repo) {
    branch: ref(qualifiedName: $branchName) {
      target {
        ... on Commit {
          history(since: $startDate, until: $endDate, after: $cursor, first: 100) {
            pageInfo {
              endCursor
              hasNextPage
            }
            nodes {
              authoredDate
              author {
                name
                avatarUrl
                user {
                  login
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
