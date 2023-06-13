export interface IRepoCommitHistoryByContributor {
  repository: {
    branches: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
      nodes: [
        {
          target: {
            history: {
              nodes: [
                {
                  author: {
                    name: string;
                    avatarUrl: string;
                    user?: { login: string };
                    date: string;
                  };
                }
              ];
            };
          };
        }
      ];
    };
  };
}
export const RepoCommitHistoryByContributorQuery = `
  query ($owner: String!, $repo: String!, $branchCursor: String, $commitCursor: String) {
    repository(owner: $owner, name: $repo) {
      branches: refs(first: 100, after: $branchCursor, refPrefix: "refs/heads/") {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          target {
            ... on Commit {
              history(first: 100, after: $commitCursor) {
                pageInfo {
                  endCursor
                  hasNextPage
                }
                nodes {
                  author {
                    user {
                      login
                    }
                    name
                    avatarUrl
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
