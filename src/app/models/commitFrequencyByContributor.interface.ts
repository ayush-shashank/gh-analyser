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
  query ($owner: String!, $repo: String!, $branchCursor: String, $commitCursor: String, $startDate: GitTimestamp, $endDate: GitTimestamp) {
    repository(owner: $owner, name: $repo) {
      branches: refs(
        refPrefix: "refs/heads/"
        first: 100
        after: $branchCursor
        orderBy: {field: TAG_COMMIT_DATE, direction: DESC}
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          target {
            ... on Commit {
              history(first: 100, after: $commitCursor, since: $startDate, until: $endDate) {
                pageInfo {
                  endCursor
                  hasNextPage
                }
                nodes {
                  author {
                    name
                    avatarUrl
                    user {
                      login
                    }
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
